import { describe, expect, test } from "bun:test";
import { DESIL_MAX_FILE_SIZE, desilFileSchema, desilFormSchema, desilUpdateSchema } from "@bps/shared";
import app from "../src";

const validForm = {
  nama: "Data latihan validasi", desa: "Desa latihan", kecamatan: "Sekayu"
};

describe("validasi desil", () => {
  test("form hanya membutuhkan nama, desa/kelurahan, dan kecamatan", () => {
    expect(desilFormSchema.safeParse(validForm).success).toBe(true);
    expect(Object.keys(desilFormSchema.shape)).toEqual(["nama", "desa", "kecamatan"]);
    for (const changes of [{ nama: " " }, { desa: " " }, { kecamatan: "" }, { kecamatan: "Di luar Muba" }]) {
      expect(desilFormSchema.safeParse({ ...validForm, ...changes }).success).toBe(false);
    }
    for (const key of ["nik", "kk", "telepon", "alamat", "alasan"]) {
      expect(desilFormSchema.safeParse({ ...validForm, [key]: "nilai tambahan" }).success).toBe(false);
      expect(desilUpdateSchema.safeParse({ [key]: "nilai tambahan" }).success).toBe(false);
    }
    expect(desilUpdateSchema.safeParse({ status: "Disetujui" }).success).toBe(false);
    expect(desilUpdateSchema.safeParse({}).success).toBe(false);
  });

  test("dokumen kosong, lebih dari 5 MB, MIME, dan ekstensi ditolak", () => {
    expect(desilFileSchema.safeParse(new File(["%PDF-1.4"], "latihan.pdf", { type: "application/pdf" })).success).toBe(true);
    for (const file of [
      new File([], "kosong.pdf", { type: "application/pdf" }),
      new File([new Uint8Array(DESIL_MAX_FILE_SIZE + 1)], "besar.pdf", { type: "application/pdf" }),
      new File(["dokumen"], "latihan.pdf", { type: "text/plain" }),
      new File(["%PDF-1.4"], "latihan.exe", { type: "application/pdf" })
    ]) expect(desilFileSchema.safeParse(file).success).toBe(false);
  });
});

describe("batas akses API desil", () => {
  test("CRUD dan unduhan memerlukan token akses", async () => {
    const id = crypto.randomUUID();
    for (const [method, path] of [
      ["GET", "/api/desil"], ["POST", "/api/desil"],
      ["GET", `/api/desil/${id}`], ["PATCH", `/api/desil/${id}`],
      ["DELETE", `/api/desil/${id}`], ["GET", `/api/desil/${id}/documents/surat`]
    ]) {
      const response = await app.handle(new Request(`http://localhost${path}`, {
        method, body: method === "POST" || method === "PATCH" ? new FormData() : undefined
      }));
      expect(response.status).toBe(401);
      expect((await response.json()).message).toBeString();
    }
  });

  test("isian tidak valid ditolak sebelum database digunakan", async () => {
    const response = await app.handle(new Request("http://localhost/api/desil", {
      method: "POST", headers: { Authorization: `Bearer ${"a".repeat(64)}` }, body: new FormData()
    }));
    expect(response.status).toBe(422);
    expect((await response.json()).fieldErrors.nama).toBeArray();
    const invalidId = await app.handle(new Request("http://localhost/api/desil/bukan-uuid", { headers: { Authorization: `Bearer ${"a".repeat(64)}` } }));
    expect(invalidId.status).toBe(422);
  });
});
