export type UploadState = "empty" | "uploading" | "done" | "invalid";
export type UploadId = "surat" | "identitas" | "domisili";

export type DesilForm = {
  nama: string;
  nik: string;
  kk: string;
  telepon: string;
  desa: string;
  kecamatan: string;
  alamat: string;
  alasan: string;
};

export type UploadDocument = {
  id: UploadId;
  label: string;
  hint: string;
};

export type UploadItem = UploadDocument & {
  file: File | null;
  status: UploadState;
  progress: number;
  message: string;
};
