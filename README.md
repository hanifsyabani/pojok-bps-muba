# Pojok BPS Muba

Frontend prototype website untuk Badan Pusat Statistik Kabupaten Musi Banyuasin.

Prototype ini dipakai untuk demonstrasi UI/UX sebelum backend dibuat. Semua angka,
kegiatan, pengajuan, dan alur layanan masih menggunakan data contoh.

## Stack Saat Ini

- Bun workspace
- Svelte + Vite
- TypeScript
- Tailwind CSS 4 melalui plugin Vite, dengan theme token BPS
- API package masih bawaan template dan belum dikembangkan untuk fase prototype

## Struktur

```text
app/
  web/       Frontend prototype Svelte
  api/       Placeholder API dari template
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

Tipe frontend berada di `app/web/src/types`. Data contoh, daftar navigasi, dan
konfigurasi tetap berada di `app/web/src/constants`. `App.svelte` mengelola route
dan `components/layout/nav-bottom.svelte` menampilkan halaman yang aktif.

## Perintah

```bash
bun install
bun run dev:web
```

Web berjalan di `http://localhost:5173`.

```bash
bun run build
bun run typecheck
```

## Catatan Prototype

- Jangan implementasikan backend, database, autentikasi, atau upload file nyata.
- Gunakan mock data di `app/web/src/constants` dan tipe di `app/web/src/types`.
- Konten harus jelas diberi konteks sebagai data contoh, bukan statistik resmi.
- Fokus saat ini: kualitas visual, responsif, navigasi, form prototype, dan demo dashboard admin.
