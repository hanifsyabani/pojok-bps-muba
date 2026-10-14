# Pojok BPS Muba

Portal informasi statistik dan layanan untuk BPS Kabupaten Musi Banyuasin,
Sumatera Selatan. Website ini dikembangkan untuk membantu masyarakat, perangkat
daerah, akademisi, peneliti, dan pelaku usaha menemukan informasi statistik dan
kanal pelayanan yang sesuai dengan kebutuhan mereka.

Proyek sudah beralih dari tahap prototype ke pengembangan website. Dokumentasi
dan konten halaman mengikuti tujuan tersebut, dengan status layanan yang tetap
sesuai implementasi saat ini.

## Ruang Lingkup

- Beranda: akses topik statistik, ringkasan indikator, dan informasi layanan.
- Profil BPS: peran lembaga, organisasi, informasi kantor, dan kontak.
- Statistik & Data: indikator daerah, tren, serta tautan publikasi dan tabel BPS.
- Layanan: informasi kebutuhan layanan dan akses kanal pelayanan resmi.
- Perbaikan Data Desil DTSEN: pengisian data pemohon dan pengiriman dokumen pengajuan.
- Kegiatan: kalender periode sensus dan survei, rincian tanggal, serta rujukan BPS.
- Admin Dashboard: pencarian, filter status, dan ringkasan pengajuan.

## Kondisi Implementasi

- Frontend menggunakan Svelte dan routing di sisi klien.
- Indikator, profil, kontak, dan kegiatan publik merujuk sumber BPS yang
  dicantumkan pada halaman. Konten disimpan lokal dan tidak diperbarui otomatis.
- Tautan layanan mengarah ke kanal resmi BPS yang sudah tersedia.
- Form DTSEN memakai Zod, mengirim pengajuan melalui service Axios ke API Elysia,
  dan menyimpan data di PostgreSQL Supabase melalui Drizzle. Dokumen disimpan
  di bucket privat Supabase Storage. Tombol kirim membuka alert dialog konfirmasi,
  tanpa tahap tinjauan. Pengajuan yang baru disimpan dapat diperbarui dan diunduh
  dokumennya dari form; endpoint daftar dan hapus tetap tersedia melalui API.
- Dashboard admin masih memakai data contoh yang ditandai. Autentikasi dan
  pengelolaan pengajuan nyata belum terhubung.
- Halaman `/login` menyediakan form email dan password tanpa pendaftaran.
  Form memvalidasi isian secara lokal dan menampilkan status autentikasi yang
  belum tersedia; form belum mengirim atau menyimpan kredensial.
- Halaman Kegiatan berisi satu kalender interaktif. Jadwal disimpan lokal di
  `app/web/src/constants/activities.ts`, bersumber dari pengumuman BPS, dan
  ditandai dengan cakupan nasional. Kalender memakai zona waktu Asia/Jakarta,
  navigasi bulan, pilihan tanggal, serta rincian sumber. Jadwal kunjungan khusus
  Musi Banyuasin belum tersedia dan tidak diasumsikan dari periode nasional.
- API menyediakan CRUD pengajuan. Penyimpanan bukan persetujuan atau perubahan
  desil DTSEN, dan belum terhubung ke sistem penetapan DTSEN atau petugas resmi.

## Stack Saat Ini

- Bun workspace
- Svelte + Vite
- TypeScript
- Tailwind CSS 4 melalui plugin Vite, dengan theme token BPS
- shadcn-svelte dan Bits UI untuk kontrol form serta dialog
- Elysia, Drizzle ORM, PostgreSQL Supabase, dan Supabase Storage
- Zod untuk validasi bersama; Axios untuk service API frontend

## Struktur

```text
app/
  web/       Frontend website Svelte
  api/       API Elysia, skema dan migrasi Drizzle, integrasi Storage
packages/
  shared/    Paket shared workspace
```

## Palette

Palette frontend saat ini mengikuti warna BPS:

```text
Sky Blue  #2D95CA
Green     #75B547
Orange    #E28939
Ink       #102033
Base      #F8FAFC
```

Token warna utama berada di blok `@theme` dalam `app/web/src/app.css`.
Halaman dan komponen menggunakan utility Tailwind. Utility bersama untuk tombol,
input, dan container juga didefinisikan dalam file tersebut.

Tipe frontend berada di `app/web/src/types`. Konten, data lokal, navigasi, dan
konfigurasi berada di `app/web/src/constants`. Nama file `prototype.ts` merupakan
penamaan lama, bukan penanda status proyek saat ini. `App.svelte` mengelola route
dan `components/layout/nav-bottom.svelte` menampilkan halaman yang aktif.
Halaman admin tersedia pada `/admin-dashboard`.

`components/dtsen/form-dtsen.svelte` memiliki state, validasi, dokumen, dan
pemanggilan service form. `DesilRepairPage.svelte` hanya mengatur layout halaman.
Komponen shadcn berada di `src/lib/components/ui`; alias `$lib` dan konfigurasi
`components.json` mendukung penambahan komponen dengan CLI dari `app/web`.
Notifikasi global memakai Sonner melalui `Toaster` di `App.svelte`. Pemanggilan
`showToast` yang sudah ada tetap tersedia dan kini menggunakan `svelte-sonner`.

## Perintah

```bash
bun install
bun run dev:web
```

Web berjalan di `http://localhost:5173`.

### API Dan Database

Konfigurasi server berada di `app/api/.env`; daftar variabel ada di
`app/api/.env.example`. `DATABASE_URL` menggunakan connection pooler Supabase.
Username pooler berbentuk `postgres.PROJECT_REF`; password dengan karakter
khusus harus di-URL-encode. Drizzle menggunakan `prepare: false` untuk mode
transaction pooler.

Storage memerlukan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`, atau legacy
`SUPABASE_SERVICE_ROLE_KEY`. Kunci publishable tidak digunakan untuk operasi
Storage server. Semua kredensial tersebut hanya berada di paket API.

```bash
cd app/api
bun run db:generate
bun run db:migrate
bun run storage:setup
bun run dev
```

Bucket `desil-documents` bersifat privat, menerima PDF, JPEG, dan PNG hingga
5 MB per dokumen. API memeriksa tipe, ekstensi, ukuran, dan signature file.
Tautan unduhan diberikan setelah pemeriksaan akses dan berlaku 60 detik.

Frontend menggunakan `/api` melalui proxy Vite secara default. Untuk API di
alamat lain, atur `VITE_API_BASE_URL` di `app/web/.env.local`, misalnya
`http://localhost:3001/api`. Origin frontend harus termasuk dalam `CORS_ORIGIN`.
Variabel `VITE_*` tidak boleh berisi kunci rahasia.

### Endpoint Desil

Semua endpoint memakai `Authorization: Bearer <token-sesi>`. Service frontend
membuat token acak 256 bit dan menyimpannya di `sessionStorage`; database hanya
menyimpan hash SHA-256. Pengajuan hanya dapat diakses oleh pemegang token yang
membuatnya. Token merupakan kredensial akses sesi, bukan akun Supabase Auth.
Menutup sesi browser dapat menghilangkan akses riwayat. Jangan membagikan token.
RLS aktif tanpa policy publik sehingga Data API Supabase tidak membuka data warga.

| Metode | Endpoint | Perilaku |
| --- | --- | --- |
| POST | `/api/desil` | Buat pengajuan dan unggah tiga dokumen |
| GET | `/api/desil` | Daftar milik sesi, dengan `page`, `pageSize`, `search`, `status` |
| GET | `/api/desil/:id` | Detail pengajuan milik sesi |
| PATCH | `/api/desil/:id` | Ubah isian atau ganti dokumen |
| DELETE | `/api/desil/:id` | Hapus pengajuan dan dokumen di Storage |
| GET | `/api/desil/:id/documents/:kind` | Tautan unduhan privat; kind `surat`, `identitas`, `domisili` |

POST dan PATCH menerima multipart form data. POST memerlukan UUID `id`,
`nama`, `desa`, `kecamatan`, serta
file `surat`, `identitas`, `domisili`. PATCH hanya menerima kolom tersebut tanpa
`id`; dokumen lama dipertahankan jika tidak diganti. `id` yang sama dapat dikirim
ulang setelah timeout tanpa membuat pengajuan ganda. Status tidak dapat diubah
oleh pemohon. Update/hapus pemohon dibatasi pada status Menunggu atau Perlu Perbaikan.

`DESIL_ADMIN_TOKEN` bersifat opsional, hanya untuk akses API administratif, dengan
format 64 digit hex. Jangan memasukkannya ke frontend. Dashboard admin tetap
memakai data contoh sampai alur login dan otorisasi petugas diimplementasikan.

```bash
cd app/api
bun test
# Pengujian integrasi memakai data latihan dan membersihkannya setelah selesai.
# PowerShell:
$env:RUN_DESIL_INTEGRATION = "1"
bun test tests/desil.integration.test.ts
```

```bash
bun run build
bun run typecheck
```

### Deployment Vercel

Deploy dari root repository dengan konfigurasi Services di `vercel.json`.
Service `web` memakai Vite dan service `api` memakai Elysia. Route `/api` dan
`/api/*` diarahkan ke API; `/api/health` dapat diperiksa tanpa akses database.
Service API memakai output `dist`, sehingga Vercel menjalankan `dist/index.js`
yang sudah menyertakan kode workspace `@bps/shared`. Menjalankan entrypoint
`src/index.ts` secara langsung di function dapat menyebabkan
`ERR_MODULE_NOT_FOUND` jika sumber TypeScript workspace tidak ikut dikemas.

Runtime memakai `bunVersion: "1.x"` (saat ini Bun 1.3.14 di Vercel).
Format `bun.lock` versi 2 tetap memerlukan Bun 1.4 untuk instalasi dan build
di Vercel. Build API mengecualikan Elysia dengan `--external=elysia`; paket ini
dimuat dari dependency saat runtime. Ini menghindari regresi bundler Bun 1.4.1
yang dapat menghasilkan deklarasi `Check2` bertabrakan saat membundel Elysia.
Regresi tersebut diperbaiki pada [Bun 1.4.2](https://bun.com/blog/bun-v1.4.2).
Build API juga mengimpor bundle yang dihasilkan agar kegagalan parsing atau
startup terdeteksi saat build.

Konfigurasikan variabel server dari `app/api/.env.example` pada environment
deployment Vercel. Setelah perubahan kode, runtime, atau environment variable,
buat deployment baru. Jika function gagal, periksa Runtime Logs untuk request
`/api/health`; `FUNCTION_INVOCATION_FAILED` saja tidak menunjukkan penyebabnya.

#### API Sebagai Project Terpisah

Untuk frontend dan API pada dua project Vercel, konfigurasi API berada di
`app/api/vercel.json`. Atur Root Directory project API ke `app/api`, dengan
Framework Preset Elysia, Build Command `bun run build`, dan Output Directory
`dist`. Aktifkan **Include source files outside of the Root Directory in the
Build Step** agar build dapat mengakses `packages/shared` dan lockfile workspace.
Pengaturan build dan runtime pada `vercel.json` di root repository hanya berlaku
untuk deployment dari root; konfigurasi API ini berlaku untuk project terpisah.

Pada project frontend, atur `VITE_API_BASE_URL` ke URL API yang berakhiran `/api`,
misalnya `https://pojok-bps-muba-j54g.vercel.app/api`. Pada project API, atur
`CORS_ORIGIN` ke daftar origin frontend, dipisahkan koma tanpa path atau garis
miring penutup, misalnya
`http://localhost:5173,https://pojok-bps-muba.vercel.app`.

Setelah push, deploy ulang project API. Pemeriksaan awal yang diharapkan adalah
`GET /api/health` mengembalikan 200 dan `OPTIONS /api/desil` dari origin frontend
yang diizinkan mengembalikan 204 dengan header `Access-Control-Allow-Origin`
sesuai origin tersebut. CORS tidak dapat berjalan jika function gagal startup.

## Sumber Konten

Konten diperiksa pada 11 Oktober 2026. Periode statistik mengikuti masing-masing
indikator, bukan tahun pemeriksaan konten.

- [Website BPS Kabupaten Musi Banyuasin](https://musibanyuasinkab.bps.go.id/id):
  alamat kantor, kontak, dan jam pelayanan.
- [Profil BPS](https://ppid.bps.go.id/app/konten/1606/Profil-BPS.html): peran lembaga
  dan struktur organisasi.
- [Kabupaten Musi Banyuasin Dalam Angka 2026](https://musibanyuasinkab.bps.go.id/id/publication/2026/02/27/b3b3d2d27b2e4d45d27aefb6/kabupaten-musi-banyuasin-dalam-angka-2026.html):
  statistik kunci halaman xxxix, indikator dan tren 2023-2025. Penduduk menggunakan
  proyeksi pertengahan tahun hasil SP2020, kemiskinan kondisi Maret, dan
  pengangguran kondisi Agustus.
- [Pertumbuhan Ekonomi 2025](https://musibanyuasinkab.bps.go.id/id/pressrelease/2026/04/13/1226/economic-growth-of-musi-banyuasin-regency-in-2025.html):
  rilis pertumbuhan ekonomi tahunan.
- [Pelayanan Statistik Terpadu](https://pst.bps.go.id/) dan
  [Layanan BPS Muba](https://ppid.bps.go.id/app/konten/1606/Layanan-BPS.html):
  kanal pelayanan dan informasi standar layanan.
- Rujukan kalender diperiksa pada 14 Oktober 2026:
  [Susenas Maret 2026](https://okukab.bps.go.id/id/news/2026/02/18/1021/supervisi-pendataan-susenas-maret-2026-ke-kecamatan-semidang-aji.html)
  untuk periode nasional 1-20 Februari 2026, serta
  [SE2026](https://yogyakarta.bps.go.id/id/news/2026/06/15/598/pendampingan-pendataan-lapangan-sensus-ekonomi-2026-kabupaten-bantul.html)
  untuk periode pendataan lapangan nasional 15 Juni-31 Agustus 2026 yang
  diumumkan pada sumber tersebut. Kalender tidak diperbarui otomatis dan
  bukan jadwal kunjungan petugas lokal.

## Pedoman Pengembangan

- Tulis konten untuk kebutuhan pengguna, dengan bahasa Indonesia yang jelas.
- Statistik, kegiatan, kontak, dan persyaratan resmi harus memiliki sumber yang
  dapat diperiksa. Jangan mengganti label data contoh tanpa mengganti datanya.
- Jangan menampilkan keberhasilan pengiriman atau penyimpanan jika proses itu
  belum tersedia. Jelaskan keterbatasan pada tindakan yang terdampak.
- Pertahankan stack, tema, aksesibilitas, dan perilaku responsif yang tersedia.
- Kembangkan backend, autentikasi, penyimpanan, dan integrasi sesuai lingkup tugas
  yang diminta; perubahan konten saja tidak memerlukan implementasi fitur tersebut.

## Konteks Untuk AI Agent

Pojok BPS Muba adalah website informasi statistik dan layanan untuk BPS Kabupaten
Musi Banyuasin. Proyek sudah masuk tahap pengembangan website. Gunakan konten
institusional yang relevan bagi pengguna dan sumber BPS yang terverifikasi.
Pertahankan Bun, Svelte + Vite, TypeScript, Tailwind CSS 4, serta tema yang tersedia.
Frontend dan API CRUD pengajuan sudah terhubung dengan Supabase setelah konfigurasi
dan migrasi diterapkan. Dashboard admin masih memakai data contoh dan penetapan
desil DTSEN tidak diotomatisasi. Pesan antarmuka harus mencerminkan kondisi
tersebut. Baca `AGENTS.md` sebelum membuat perubahan.
