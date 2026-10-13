import type { DesilDocument, DesilDocumentId, DesilInput } from "@bps/shared";

export type UploadState = "empty" | "done" | "invalid";
export type UploadId = DesilDocumentId;

export type DesilForm = Omit<DesilInput, "kecamatan"> & { kecamatan: DesilInput["kecamatan"] | "" };

export type UploadDocument = {
  id: UploadId;
  label: string;
  hint: string;
};

export type UploadItem = UploadDocument & {
  file: File | null;
  storedDocument: DesilDocument | null;
  status: UploadState;
  progress: number;
  message: string;
};
