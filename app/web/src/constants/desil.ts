import type { DesilForm, UploadDocument, UploadItem } from "../types/desil";
import type { SubmissionFilter } from "../types/prototype";
import { DESIL_KECAMATAN, DESIL_UPLOAD_TYPES } from "@bps/shared";

export const allowedUploadTypes = DESIL_UPLOAD_TYPES;

export const emptyDesilForm: Readonly<DesilForm> = {
  nama: "",
  desa: "",
  kecamatan: ""
};

export const uploadDocuments: UploadDocument[] = [
  { id: "surat", label: "Surat keterangan desa/kelurahan", hint: "PDF, JPG, JPEG, atau PNG maks 5 MB" },
  { id: "identitas", label: "KTP atau Kartu Keluarga", hint: "PDF, JPG, JPEG, atau PNG maks 5 MB" },
  { id: "domisili", label: "Foto rumah atau bukti domisili", hint: "PDF, JPG, JPEG, atau PNG maks 5 MB" }
];

export const emptyUploadState: Readonly<Pick<UploadItem, "file" | "storedDocument" | "status" | "progress" | "message">> = {
  file: null,
  storedDocument: null,
  status: "empty",
  progress: 0,
  message: "Belum ada file"
};

export const desilProcessSteps: string[] = [
  "Isi nama lengkap, desa/kelurahan, dan kecamatan.",
  "Pilih dokumen pendukung untuk pengajuan.",
  "Konfirmasikan pengiriman pengajuan.",
  "Kirim pengajuan dan simpan dokumen melalui layanan website."
];

export const kecamatanOptions = DESIL_KECAMATAN;

export const submissionStatusOptions: SubmissionFilter[] = [
  "Semua",
  "Menunggu",
  "Disetujui",
  "Perlu Perbaikan",
  "Ditolak"
];
