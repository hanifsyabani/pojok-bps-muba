import { createHash, timingSafeEqual } from "node:crypto";
import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { Elysia } from "elysia";
import { z } from "zod";
import {
  API_ROUTES, DESIL_DOCUMENT_IDS, desilCreateSchema, desilListQuerySchema, desilUpdateSchema,
  type DesilSubmission
} from "@bps/shared";
import { getDatabase } from "../db";
import { desilSubmissions, type StoredDesilDocument } from "../db/schema";
import { ApiError } from "../errors";
import { documentDownloadUrl, getStorageClient, removeDocuments, removeSubmissionDocuments, uploadDocument } from "../storage";

function parse<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (!result.success) {
    throw new ApiError(422, "Periksa data yang diisi.", z.flattenError(result.error).fieldErrors as Record<string, string[]>);
  }
  return result.data;
}

function credentials(authorization: string | undefined) {
  const token = authorization?.match(/^Bearer ([a-f0-9]{64})$/)?.[1];
  if (!token) throw new ApiError(401, "Token akses pengajuan tidak tersedia atau tidak valid.");
  const configuredAdmin = process.env.DESIL_ADMIN_TOKEN;
  const admin = Boolean(configuredAdmin?.match(/^[a-f0-9]{64}$/)) &&
    timingSafeEqual(Buffer.from(token), Buffer.from(configuredAdmin!));
  return { hash: createHash("sha256").update(token).digest("hex"), admin };
}

function recordCondition(id: string, access: ReturnType<typeof credentials>) {
  parse(z.uuid(), id);
  return and(eq(desilSubmissions.id, id), access.admin ? undefined : eq(desilSubmissions.accessTokenHash, access.hash));
}

function toSubmission(record: typeof desilSubmissions.$inferSelect): DesilSubmission {
  const { id, nama, desa, kecamatan, status, documents, createdAt, updatedAt } = record;
  return {
    id, nama, desa, kecamatan, status,
    documents: documents.map(({ path: _path, ...document }) => document),
    createdAt: createdAt.toISOString(), updatedAt: updatedAt.toISOString()
  };
}

async function cleanupUploads(documents: StoredDesilDocument[]) {
  if (!documents.length) return;
  try {
    // A lost response can follow a committed write; keep files referenced by the database.
    const id = documents[0].path.split("/")[0];
    const [record] = await getDatabase().select({ documents: desilSubmissions.documents })
      .from(desilSubmissions).where(eq(desilSubmissions.id, id)).limit(1);
    await removeDocuments(documents.filter((document) => !record?.documents.some((stored) => stored.path === document.path)));
  }
  catch { console.error("Document cleanup failed; inspect private storage for unreferenced uploads."); }
}

export const desilRoutes = new Elysia({ prefix: API_ROUTES.desil })
  .onBeforeHandle(({ set }) => { set.headers["Cache-Control"] = "no-store"; })
  .get("", async ({ headers, query }) => {
    const access = credentials(headers.authorization);
    const { page, pageSize, search, status } = parse(desilListQuerySchema, query);
    const keyword = search?.replace(/[\\%_]/g, "\\$&");
    const condition = and(
      access.admin ? undefined : eq(desilSubmissions.accessTokenHash, access.hash),
      status ? eq(desilSubmissions.status, status) : undefined,
      keyword ? or(ilike(desilSubmissions.nama, `%${keyword}%`), ilike(desilSubmissions.desa, `%${keyword}%`), ilike(desilSubmissions.kecamatan, `%${keyword}%`)) : undefined
    );
    return getDatabase().transaction(async (tx) => {
      const [{ total }] = await tx.select({ total: count() }).from(desilSubmissions).where(condition);
      const records = await tx.select().from(desilSubmissions).where(condition)
        .orderBy(desc(desilSubmissions.createdAt), desc(desilSubmissions.id)).limit(pageSize).offset((page - 1) * pageSize);
      return { data: records.map(toSubmission), pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) } };
    }, { isolationLevel: "repeatable read", accessMode: "read only" });
  })
  .get("/:id", async ({ headers, params }) => {
    const condition = recordCondition(params.id, credentials(headers.authorization));
    const [record] = await getDatabase().select().from(desilSubmissions).where(condition).limit(1);
    if (!record) throw new ApiError(404, "Pengajuan tidak ditemukan.");
    return { data: toSubmission(record) };
  })
  .post("", async ({ headers, body, set }) => {
    const access = credentials(headers.authorization);
    const input = parse(desilCreateSchema, body);
    const { id, surat, identitas, domisili, ...fields } = input;
    const condition = recordCondition(id, access);
    const database = getDatabase();
    const [existing] = await database.select().from(desilSubmissions).where(eq(desilSubmissions.id, id)).limit(1);
    if (existing) {
      if (existing.accessTokenHash !== access.hash) throw new ApiError(409, "ID pengajuan sudah digunakan.");
      return { data: toSubmission(existing) };
    }
    getStorageClient();
    const files = { surat, identitas, domisili };
    const uploaded: StoredDesilDocument[] = [];
    try {
      for (const kind of DESIL_DOCUMENT_IDS) uploaded.push(await uploadDocument(id, kind, files[kind]));
      const [created] = await database.insert(desilSubmissions)
        .values({ id, accessTokenHash: access.hash, ...fields, documents: uploaded })
        .onConflictDoNothing({ target: desilSubmissions.id }).returning();
      if (created) {
        set.status = 201;
        return { data: toSubmission(created) };
      }
      await cleanupUploads(uploaded);
      const [retried] = await database.select().from(desilSubmissions).where(condition).limit(1);
      if (!retried) throw new ApiError(409, "ID pengajuan sudah digunakan.");
      return { data: toSubmission(retried) };
    } catch (error) {
      await cleanupUploads(uploaded);
      throw error;
    }
  }, { parse: "multipart/form-data" })
  .patch("/:id", async ({ headers, params, body }) => {
    const access = credentials(headers.authorization);
    const condition = recordCondition(params.id, access);
    const { surat, identitas, domisili, ...changes } = parse(desilUpdateSchema, body);
    const replacements = { surat, identitas, domisili };
    const uploaded: StoredDesilDocument[] = [];
    let superseded: StoredDesilDocument[] = [];
    let saved: typeof desilSubmissions.$inferSelect;
    try {
      saved = await getDatabase().transaction(async (tx) => {
        const [record] = await tx.select().from(desilSubmissions).where(condition).for("update");
        if (!record) throw new ApiError(404, "Pengajuan tidak ditemukan.");
        if (!access.admin && record.status !== "Menunggu" && record.status !== "Perlu Perbaikan") {
          throw new ApiError(409, "Pengajuan pada status ini tidak dapat diubah.");
        }
        for (const kind of DESIL_DOCUMENT_IDS) {
          const file = replacements[kind];
          if (file) uploaded.push(await uploadDocument(params.id, kind, file));
        }
        superseded = record.documents.filter((document) => uploaded.some((replacement) => replacement.kind === document.kind));
        const documents = record.documents.map((document) => uploaded.find((replacement) => replacement.kind === document.kind) ?? document);
        const [updated] = await tx.update(desilSubmissions).set({ ...changes, documents, updatedAt: new Date() }).where(condition).returning();
        return updated;
      });
    } catch (error) {
      await cleanupUploads(uploaded);
      throw error;
    }
    await cleanupUploads(superseded);
    return { data: toSubmission(saved) };
  }, { parse: "multipart/form-data" })
  .delete("/:id", async ({ headers, params, set }) => {
    const access = credentials(headers.authorization);
    const condition = recordCondition(params.id, access);
    await getDatabase().transaction(async (tx) => {
      const [record] = await tx.select().from(desilSubmissions).where(condition).for("update");
      if (!record) throw new ApiError(404, "Pengajuan tidak ditemukan.");
      if (!access.admin && record.status !== "Menunggu" && record.status !== "Perlu Perbaikan") {
        throw new ApiError(409, "Pengajuan pada status ini tidak dapat dihapus.");
      }
      await removeSubmissionDocuments(record.id);
      await tx.delete(desilSubmissions).where(condition);
    });
    set.status = 204;
  })
  .get("/:id/documents/:kind", async ({ headers, params }) => {
    const kind = parse(z.enum(DESIL_DOCUMENT_IDS), params.kind);
    const condition = recordCondition(params.id, credentials(headers.authorization));
    const [record] = await getDatabase().select().from(desilSubmissions).where(condition).limit(1);
    if (!record) throw new ApiError(404, "Pengajuan tidak ditemukan.");
    const document = record.documents.find((item) => item.kind === kind);
    if (!document) throw new ApiError(404, "Dokumen tidak ditemukan.");
    return documentDownloadUrl(document);
  });
