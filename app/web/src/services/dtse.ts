import axios, { type AxiosProgressEvent } from "axios";
import {
  desilCreateSchema, desilDownloadResponseSchema, desilFormSchema, desilListResponseSchema,
  desilResponseSchema, desilUpdateSchema,
  type DesilDocumentId, type DesilDocuments, type DesilInput, type DesilListQuery
} from "@bps/shared";
import { api } from "./api";

const sessionKey = "bps-desil-session";
let sessionToken: string | null = null;

export function hasDesilSession() {
  return Boolean(sessionToken ?? sessionStorage.getItem(sessionKey));
}

function authorization() {
  sessionToken ??= sessionStorage.getItem(sessionKey);
  if (!sessionToken) {
    sessionToken = Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
    sessionStorage.setItem(sessionKey, sessionToken);
  }
  return { Authorization: `Bearer ${sessionToken}` };
}

function multipart(input: Record<string, string | File | undefined>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(input)) if (value !== undefined) data.append(key, value);
  return data;
}

export async function createDesilSubmission(id: string, input: DesilInput, files: DesilDocuments, onProgress?: (event: AxiosProgressEvent) => void) {
  const payload = desilCreateSchema.parse({ id, ...desilFormSchema.parse(input), ...files });
  const response = await api.post("/desil", multipart(payload), { headers: authorization(), onUploadProgress: onProgress });
  return desilResponseSchema.parse(response.data).data;
}

export async function listDesilSubmissions(query: DesilListQuery = {}) {
  const response = await api.get("/desil", { headers: authorization(), params: query });
  return desilListResponseSchema.parse(response.data);
}

export async function getDesilSubmission(id: string) {
  const response = await api.get(`/desil/${encodeURIComponent(id)}`, { headers: authorization() });
  return desilResponseSchema.parse(response.data).data;
}

export async function updateDesilSubmission(id: string, input: DesilInput, files: Partial<DesilDocuments>, onProgress?: (event: AxiosProgressEvent) => void) {
  const payload = desilUpdateSchema.parse({ ...desilFormSchema.parse(input), ...files });
  const response = await api.patch(`/desil/${encodeURIComponent(id)}`, multipart(payload), { headers: authorization(), onUploadProgress: onProgress });
  return desilResponseSchema.parse(response.data).data;
}

export async function deleteDesilSubmission(id: string) {
  await api.delete(`/desil/${encodeURIComponent(id)}`, { headers: authorization() });
}

export async function downloadDesilDocument(id: string, kind: DesilDocumentId) {
  const response = await api.get(`/desil/${encodeURIComponent(id)}/documents/${kind}`, { headers: authorization() });
  const { url } = desilDownloadResponseSchema.parse(response.data);
  return (await axios.get<Blob>(url, { responseType: "blob", timeout: 60000 })).data;
}
