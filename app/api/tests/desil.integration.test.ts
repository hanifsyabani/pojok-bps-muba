import { expect, test } from "bun:test";
import { sql } from "drizzle-orm";
import { desilResponseSchema, type DesilInput } from "@bps/shared";
import app from "../src";
import { closeDatabase, getDatabase } from "../src/db";
import { desilBucket, getStorageClient } from "../src/storage";

test.skipIf(process.env.RUN_DESIL_INTEGRATION !== "1")("CRUD, isolasi pemohon, dan Storage privat di Supabase", async () => {
  const id = crypto.randomUUID();
  const owner = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
  const other = crypto.randomUUID().replaceAll("-", "") + crypto.randomUUID().replaceAll("-", "");
  const fields: DesilInput = {
    nama: `Data latihan API ${id.slice(0, 8)}`, desa: "Desa latihan", kecamatan: "Sekayu"
  };
  const pdf = "%PDF-1.4\n% Data latihan endpoint, bukan dokumen warga\n%%EOF\n";
  function createBody() {
    const body = new FormData();
    body.set("id", id);
    for (const [key, value] of Object.entries(fields)) body.set(key, value);
    for (const kind of ["surat", "identitas", "domisili"]) body.set(kind, new File([pdf], `${kind}-latihan.pdf`, { type: "application/pdf" }));
    return body;
  }
  async function request(method: string, path = "", body?: FormData, token = owner) {
    return app.handle(new Request(`http://localhost/api/desil${path}`, {
      method, headers: { Authorization: `Bearer ${token}` }, body
    }));
  }
  try {
    const bucket = await getStorageClient().storage.getBucket(desilBucket);
    expect(bucket.error).toBeNull();
    expect(bucket.data?.public).toBe(false);
    const created = await request("POST", "", createBody());
    expect(created.status).toBe(201);
    const responseBody = await created.json();
    const record = desilResponseSchema.parse(responseBody).data;
    for (const key of ["nik", "kk", "telepon", "alamat", "alasan"]) expect(responseBody.data).not.toHaveProperty(key);
    expect(record.id).toBe(id);
    expect(record.documents).toHaveLength(3);
    expect(record.status).toBe("Menunggu");
    expect(JSON.stringify(record)).not.toContain("accessTokenHash");
    expect(JSON.stringify(record.documents)).not.toContain('"path"');

    const retry = await request("POST", "", createBody());
    expect(retry.status).toBe(200);
    const listing = await (await request("GET", "?pageSize=1")).json();
    expect(listing.pagination.total).toBe(1);
    expect(listing.data[0].id).toBe(id);
    expect((await request("GET", `/${id}`, undefined, other)).status).toBe(404);
    const unauthorizedUpdate = new FormData();
    unauthorizedUpdate.set("desa", "Desa latihan sesi berbeda");
    expect((await request("PATCH", `/${id}`, unauthorizedUpdate, other)).status).toBe(404);
    expect((await request("DELETE", `/${id}`, undefined, other)).status).toBe(404);
    expect((await request("GET", `/${id}/documents/surat`, undefined, other)).status).toBe(404);
    expect((await (await request("GET", "", undefined, other)).json()).pagination.total).toBe(0);

    const signed = await (await request("GET", `/${id}/documents/surat`)).json();
    expect(signed.expiresIn).toBe(60);
    const download = await fetch(signed.url);
    expect(download.status).toBe(200);
    expect(await download.text()).toBe(pdf);

    const spoofed = new FormData();
    spoofed.set("surat", new File(["not a PDF"], "spoofed.pdf", { type: "application/pdf" }));
    expect((await request("PATCH", `/${id}`, spoofed)).status).toBe(422);
    const update = new FormData();
    update.set("desa", "Desa latihan diperbarui");
    update.set("surat", new File([pdf + "% revisi"], "surat-revisi-latihan.pdf", { type: "application/pdf" }));
    const updated = await request("PATCH", `/${id}`, update);
    expect(updated.status).toBe(200);
    const updatedRecord = desilResponseSchema.parse(await updated.json()).data;
    expect(updatedRecord.desa).toBe("Desa latihan diperbarui");
    expect(updatedRecord.documents.find((item) => item.kind === "surat")?.name).toBe("surat-revisi-latihan.pdf");
    expect((await getStorageClient().storage.from(desilBucket).list(id)).data).toHaveLength(3);
    const failedId = crypto.randomUUID();
    const failedBody = createBody();
    failedBody.set("id", failedId);
    failedBody.set("identitas", new File(["not a PDF"], "invalid-latihan.pdf", { type: "application/pdf" }));
    expect((await request("POST", "", failedBody)).status).toBe(422);
    expect((await getStorageClient().storage.from(desilBucket).list(failedId)).data).toHaveLength(0);
    expect((await request("GET", `/${failedId}`)).status).toBe(404);
    const orphan = await getStorageClient().storage.from(desilBucket).upload(`${id}/orphan-latihan.pdf`, new Blob([pdf], { type: "application/pdf" }));
    expect(orphan.error).toBeNull();
    expect((await (await request("GET", "?page=0")).json()).fieldErrors.page).toBeArray();
    const extra = new FormData(); extra.set("status", "Disetujui");
    expect((await request("PATCH", `/${id}`, extra)).status).toBe(422);

    const rls = await getDatabase().execute(sql`select relrowsecurity from pg_class where oid = 'public.desil_submissions'::regclass`);
    expect(rls[0].relrowsecurity).toBe(true);
    await getDatabase().transaction(async (tx) => {
      await tx.execute(sql`set local role anon`);
      const rows = await tx.execute(sql`select id from public.desil_submissions`);
      expect(rows).toHaveLength(0);
    });
    expect((await request("DELETE", `/${id}`)).status).toBe(204);
    expect((await request("GET", `/${id}`)).status).toBe(404);
    expect((await getStorageClient().storage.from(desilBucket).list(id)).data).toHaveLength(0);
  } finally {
    await request("DELETE", `/${id}`);
    await closeDatabase();
  }
}, 120000);
