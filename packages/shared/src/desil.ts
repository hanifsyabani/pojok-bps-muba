import { z } from "zod";

export const DESIL_KECAMATAN = [
  "Sanga Desa", "Babat Toman", "Batanghari Leko", "Plakat Tinggi", "Lawang Wetan",
  "Sungai Keruh", "Jirak Jaya", "Sekayu", "Lais", "Sungai Lilin", "Keluang",
  "Babat Supat", "Bayung Lencir", "Lalan", "Tungkal Jaya"
] as const;
export const DESIL_DOCUMENT_IDS = ["surat", "identitas", "domisili"] as const;
export const DESIL_STATUSES = ["Menunggu", "Disetujui", "Perlu Perbaikan", "Ditolak"] as const;
export const DESIL_UPLOAD_TYPES = ["application/pdf", "image/jpeg", "image/png"] as const;
export const DESIL_MAX_FILE_SIZE = 5 * 1024 * 1024;

export const desilFormSchema = z.strictObject({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter.").max(160, "Nama maksimal 160 karakter."),
  desa: z.string().trim().min(1, "Desa/kelurahan wajib diisi.").max(160, "Nama desa/kelurahan maksimal 160 karakter."),
  kecamatan: z.enum(DESIL_KECAMATAN, { error: "Pilih kecamatan di Kabupaten Musi Banyuasin." })
});

export const desilFileSchema = z.file()
  .min(1, "File tidak boleh kosong.")
  .max(DESIL_MAX_FILE_SIZE, "Ukuran file maksimal 5 MB.")
  .mime([...DESIL_UPLOAD_TYPES], "Format file harus PDF, JPG, JPEG, atau PNG.")
  .refine((file) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return file.type === "application/pdf" ? extension === "pdf"
      : file.type === "image/png" ? extension === "png"
      : extension === "jpg" || extension === "jpeg";
  }, "Ekstensi file harus sesuai dengan format dokumen.");

export const desilDocumentsSchema = z.strictObject({
  surat: desilFileSchema,
  identitas: desilFileSchema,
  domisili: desilFileSchema
});

export const desilCreateSchema = z.strictObject({
  id: z.uuid(),
  ...desilFormSchema.shape,
  ...desilDocumentsSchema.shape
});
export const desilUpdateSchema = z.strictObject({
  ...desilFormSchema.partial().shape,
  ...desilDocumentsSchema.partial().shape
}).refine((input) => Object.keys(input).length > 0, "Tidak ada perubahan untuk disimpan.");

export const desilListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).max(10000).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  search: z.string().trim().max(100).optional(),
  status: z.enum(DESIL_STATUSES).optional()
});

export const desilDocumentSchema = z.object({
  kind: z.enum(DESIL_DOCUMENT_IDS),
  name: z.string(),
  size: z.number().int().positive(),
  contentType: z.enum(DESIL_UPLOAD_TYPES)
});
export const desilSubmissionSchema = desilFormSchema.extend({
  id: z.uuid(),
  status: z.enum(DESIL_STATUSES),
  documents: z.array(desilDocumentSchema).length(3),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
});
export const desilResponseSchema = z.object({ data: desilSubmissionSchema });
export const desilListResponseSchema = z.object({
  data: z.array(desilSubmissionSchema),
  pagination: z.object({
    page: z.number().int(), pageSize: z.number().int(), total: z.number().int(), totalPages: z.number().int()
  })
});
export const desilDownloadResponseSchema = z.object({ url: z.httpUrl(), expiresIn: z.number().int() });

export type DesilInput = z.infer<typeof desilFormSchema>;
export type DesilDocument = z.infer<typeof desilDocumentSchema>;
export type DesilDocumentId = typeof DESIL_DOCUMENT_IDS[number];
export type DesilDocuments = z.infer<typeof desilDocumentsSchema>;
export type DesilSubmission = z.infer<typeof desilSubmissionSchema>;
export type DesilListResponse = z.infer<typeof desilListResponseSchema>;
export type DesilListQuery = z.input<typeof desilListQuerySchema>;
export type ApiErrorResponse = { message: string; fieldErrors?: Record<string, string[]> };
