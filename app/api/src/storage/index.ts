import { createClient } from "@supabase/supabase-js";
import { DESIL_MAX_FILE_SIZE, DESIL_UPLOAD_TYPES, type DesilDocumentId } from "@bps/shared";
import type { StoredDesilDocument } from "../db/schema";
import { ApiError } from "../errors";

export const desilBucket = process.env.SUPABASE_DESIL_BUCKET ?? "desil-documents";
let supabase: ReturnType<typeof createClient> | undefined;

export function getStorageClient() {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new ApiError(503, "Penyimpanan dokumen belum dikonfigurasi.");
  supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
  return supabase;
}

export async function ensureDesilBucket() {
  const client = getStorageClient();
  const existing = await client.storage.getBucket(desilBucket);
  if (existing.error && existing.error.message !== "Bucket not found") {
    throw new ApiError(503, "Bucket dokumen belum dapat diperiksa.");
  }
  if (!existing.data) {
    const { error } = await client.storage.createBucket(desilBucket, {
      public: false, fileSizeLimit: DESIL_MAX_FILE_SIZE, allowedMimeTypes: [...DESIL_UPLOAD_TYPES]
    });
    if (error) throw new ApiError(503, "Bucket dokumen belum dapat dibuat.");
  } else if (existing.data.public) {
    throw new ApiError(503, "Bucket dokumen harus bersifat privat.");
  }
}

export async function uploadDocument(id: string, kind: DesilDocumentId, file: File): Promise<StoredDesilDocument> {
  const bytes = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const validSignature = file.type === "application/pdf"
    ? new TextDecoder().decode(bytes).startsWith("%PDF-")
    : file.type === "image/png"
      ? [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte)
      : bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
  if (!validSignature) throw new ApiError(422, "Isi dokumen tidak sesuai dengan format file.", { [kind]: ["File harus berupa PDF, JPG/JPEG, atau PNG yang valid."] });
  const extension = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg";
  const path = `${id}/${kind}-${crypto.randomUUID()}.${extension}`;
  const { error } = await getStorageClient().storage.from(desilBucket).upload(path, file, {
    contentType: file.type, upsert: false
  });
  if (error) throw new ApiError(503, "Dokumen gagal disimpan. Silakan coba kembali.");
  return { kind, path, name: file.name, size: file.size, contentType: file.type as StoredDesilDocument["contentType"] };
}

export async function removeDocuments(documents: StoredDesilDocument[]) {
  if (!documents.length) return;
  const { error } = await getStorageClient().storage.from(desilBucket).remove(documents.map((document) => document.path));
  if (error) throw new ApiError(503, "Dokumen gagal dihapus. Pengajuan belum dihapus; silakan coba kembali.");
}

export async function removeSubmissionDocuments(id: string) {
  const bucket = getStorageClient().storage.from(desilBucket);
  while (true) {
    const { data, error: listError } = await bucket.list(id, { limit: 100 });
    if (listError || !data) throw new ApiError(503, "Dokumen pengajuan belum dapat diperiksa untuk penghapusan.");
    if (!data.length) return;
    const { error } = await bucket.remove(data.map((file) => `${id}/${file.name}`));
    if (error) throw new ApiError(503, "Dokumen gagal dihapus. Pengajuan belum dihapus; silakan coba kembali.");
  }
}

export async function documentDownloadUrl(document: StoredDesilDocument) {
  const expiresIn = 60;
  const { data, error } = await getStorageClient().storage.from(desilBucket)
    .createSignedUrl(document.path, expiresIn, { download: document.name });
  if (error || !data) throw new ApiError(503, "Dokumen belum dapat diunduh.");
  return { url: data.signedUrl, expiresIn };
}
