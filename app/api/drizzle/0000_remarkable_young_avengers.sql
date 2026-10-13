CREATE TYPE "public"."desil_submission_status" AS ENUM('Menunggu', 'Disetujui', 'Perlu Perbaikan', 'Ditolak');--> statement-breakpoint
CREATE TABLE "desil_submissions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"access_token_hash" text NOT NULL,
	"nama" text NOT NULL,
	"nik" text NOT NULL,
	"kk" text NOT NULL,
	"telepon" text NOT NULL,
	"desa" text NOT NULL,
	"kecamatan" text NOT NULL,
	"alamat" text NOT NULL,
	"alasan" text NOT NULL,
	"status" "desil_submission_status" DEFAULT 'Menunggu' NOT NULL,
	"documents" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "desil_nik_digits" CHECK ("desil_submissions"."nik" ~ '^[0-9]{16}$'),
	CONSTRAINT "desil_kk_digits" CHECK ("desil_submissions"."kk" ~ '^[0-9]{16}$'),
	CONSTRAINT "desil_document_count" CHECK (jsonb_typeof("desil_submissions"."documents") = 'array' and jsonb_array_length("desil_submissions"."documents") = 3)
);
--> statement-breakpoint
ALTER TABLE "desil_submissions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX "desil_owner_created_idx" ON "desil_submissions" USING btree ("access_token_hash","created_at");--> statement-breakpoint
CREATE INDEX "desil_status_created_idx" ON "desil_submissions" USING btree ("status","created_at");