import type { DesilForm, UploadDocument, UploadItem } from "../types/desil";
import type { SubmissionFilter } from "../types/prototype";

export const desilReferenceNumber = "DTSEN-2026-00124";
export const allowedUploadTypes: string[] = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

export const emptyDesilForm: Readonly<DesilForm> = {
  nama: "",
  nik: "",
  kk: "",
  telepon: "",
  desa: "",
  kecamatan: "",
  alamat: "",
  alasan: ""
};

export const uploadDocuments: UploadDocument[] = [
  { id: "surat", label: "Surat keterangan desa/kelurahan", hint: "PDF, JPG, JPEG, atau PNG maks 5 MB" },
  { id: "identitas", label: "KTP atau Kartu Keluarga", hint: "PDF, JPG, JPEG, atau PNG maks 5 MB" },
  { id: "domisili", label: "Foto rumah atau bukti domisili", hint: "PDF, JPG, JPEG, atau PNG maks 5 MB" }
];

export const emptyUploadState: Readonly<Pick<UploadItem, "file" | "status" | "progress" | "message">> = {
  file: null,
  status: "empty",
  progress: 0,
  message: "Belum ada file"
};

export const desilProcessSteps: string[] = [
  "Isi identitas pemohon dan wilayah domisili.",
  "Unggah dokumen pendukung dalam format yang diizinkan.",
  "Tinjau ringkasan data sebelum mengirim simulasi pengajuan.",
  "Sistem menampilkan nomor pengajuan contoh."
];

export const desilRequirements: string[] = [
  "Identitas pemohon dan data keluarga",
  "Alamat domisili lengkap",
  "Dokumen pendukung berformat PDF, JPG, JPEG, atau PNG",
  "Nomor kontak aktif untuk konfirmasi petugas"
];

export const kecamatanOptions: string[] = [
  "Sekayu",
  "Sungai Lilin",
  "Bayung Lencir",
  "Lais",
  "Tungkal Jaya",
  "Babat Toman",
  "Sanga Desa",
  "Keluang"
];

export const submissionStatusOptions: SubmissionFilter[] = [
  "Semua",
  "Menunggu",
  "Disetujui",
  "Perlu Perbaikan",
  "Ditolak"
];
