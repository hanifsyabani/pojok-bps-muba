import { sql } from "drizzle-orm";
import { check, index, jsonb, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { DESIL_STATUSES, type DesilDocument, type DesilInput } from "@bps/shared";

export type StoredDesilDocument = DesilDocument & { path: string };
export const desilStatus = pgEnum("desil_submission_status", DESIL_STATUSES);

export const desilSubmissions = pgTable("desil_submissions", {
  id: uuid("id").primaryKey(),
  accessTokenHash: text("access_token_hash").notNull(),
  nama: text("nama").notNull(),
  // Retain legacy values without collecting these fields in new applications.
  nik: text("nik"),
  kk: text("kk"),
  telepon: text("telepon"),
  desa: text("desa").notNull(),
  kecamatan: text("kecamatan").$type<DesilInput["kecamatan"]>().notNull(),
  alamat: text("alamat"),
  alasan: text("alasan"),
  status: desilStatus("status").default("Menunggu").notNull(),
  documents: jsonb("documents").$type<StoredDesilDocument[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull()
}, (table) => [
  index("desil_owner_created_idx").on(table.accessTokenHash, table.createdAt),
  index("desil_status_created_idx").on(table.status, table.createdAt),
  check("desil_nik_digits", sql`${table.nik} ~ '^[0-9]{16}$'`),
  check("desil_kk_digits", sql`${table.kk} ~ '^[0-9]{16}$'`),
  check("desil_document_count", sql`jsonb_typeof(${table.documents}) = 'array' and jsonb_array_length(${table.documents}) = 3`)
]).enableRLS();
