import type {
  ActivityItem,
  DatasetExample,
  DesilSubmission,
  FeaturedIndicator,
  OfficeInformation,
  PortalTopic,
  ProfileHighlight,
  ServiceItem,
  StatisticCard
} from "../types/prototype";

export const quickStatistics: StatisticCard[] = [
  {
    label: "Jumlah Penduduk",
    value: "695.420",
    helper: "Data contoh 2026",
    tone: "sky"
  },
  {
    label: "Tingkat Kemiskinan",
    value: "10,42%",
    helper: "Data contoh 2026",
    tone: "orange"
  },
  {
    label: "Tingkat Pengangguran",
    value: "3,87%",
    helper: "Data contoh 2026",
    tone: "green"
  },
  {
    label: "Pertumbuhan Ekonomi",
    value: "5,21%",
    helper: "Data contoh 2026",
    tone: "sky"
  }
];

export const portalNetworkCenter = { x: 450, y: 168 };

export const portalTopics: PortalTopic[] = [
  { label: "Kependudukan", icon: "users-round", helper: "Data sosial", tone: "sky", x: 120, y: 128, path: "/statistik-data" },
  { label: "Kemiskinan", icon: "hand-coins", helper: "Indikator contoh", tone: "orange", x: 280, y: 62, path: "/statistik-data" },
  { label: "Ekonomi", icon: "chart-no-axes-combined", helper: "Tren daerah", tone: "green", x: 650, y: 66, path: "/statistik-data" },
  { label: "Publikasi", icon: "book-open", helper: "Katalog contoh", tone: "sky", x: 790, y: 136, path: "/layanan" },
  { label: "DTSEN", icon: "file-text", helper: "Perbaikan desil", tone: "orange", x: 760, y: 226, path: "/perbaikan-data-desil" },
  { label: "PST", icon: "database", helper: "Layanan data", tone: "green", x: 180, y: 224, path: "/layanan" },
  { label: "Kegiatan", icon: "calendar-days", helper: "Agenda BPS", tone: "sky", x: 355, y: 290, path: "/kegiatan" },
  { label: "Admin", icon: "monitor", helper: "Demo monitoring", tone: "green", x: 575, y: 292, path: "/admin-dashboard" }
];

export const profileHighlights: ProfileHighlight[] = [
  {
    title: "Identitas portal",
    body:
      "Pojok BPS Muba disiapkan sebagai prototype portal informasi dan layanan BPS Kabupaten Musi Banyuasin."
  },
  {
    title: "Konten kelembagaan",
    body:
      "Area profil dapat memuat sejarah, struktur organisasi, wilayah kerja, dan kanal pelayanan setelah materi resmi divalidasi."
  },
  {
    title: "Kanal layanan",
    body:
      "Prototype menampilkan alur permintaan data, konsultasi statistik, kegiatan, dan perbaikan data desil DTSEN."
  },
  {
    title: "Catatan data",
    body:
      "Seluruh angka dan contoh layanan di aplikasi ini adalah data contoh untuk kebutuhan presentasi, bukan statistik resmi."
  }
];

export const featuredIndicators: FeaturedIndicator[] = [
  {
    name: "Penduduk",
    value: "695.000",
    unit: "jiwa",
    note: "Ilustrasi tren penduduk Musi Banyuasin",
    tone: "sky",
    trend: [
      { year: "2021", value: 640 },
      { year: "2022", value: 650 },
      { year: "2023", value: 665 },
      { year: "2024", value: 680 },
      { year: "2025", value: 695 }
    ]
  },
  {
    name: "Kemiskinan",
    value: "10,42",
    unit: "persen",
    note: "Ilustrasi tren penurunan persentase kemiskinan",
    tone: "orange",
    trend: [
      { year: "2021", value: 11.2 },
      { year: "2022", value: 10.95 },
      { year: "2023", value: 10.72 },
      { year: "2024", value: 10.55 },
      { year: "2025", value: 10.42 }
    ]
  },
  {
    name: "Pertumbuhan Ekonomi",
    value: "5,21",
    unit: "persen",
    note: "Ilustrasi tren pertumbuhan ekonomi daerah",
    tone: "green",
    trend: [
      { year: "2021", value: 3.21 },
      { year: "2022", value: 4.85 },
      { year: "2023", value: 5.02 },
      { year: "2024", value: 5.17 },
      { year: "2025", value: 5.21 }
    ]
  }
];

export const services: ServiceItem[] = [
  {
    title: "Permintaan Data",
    description: "Layanan informasi statistik untuk masyarakat, perangkat daerah, akademisi, dan pelaku usaha.",
    requirements: ["Identitas pemohon", "Topik data yang dibutuhkan", "Tujuan penggunaan data"],
    procedure: "Pemohon mengisi kebutuhan data, petugas memeriksa ketersediaan, lalu memberi arahan layanan.",
    tone: "sky"
  },
  {
    title: "Konsultasi Statistik",
    description: "Pendampingan awal terkait indikator statistik, metodologi, dan interpretasi data contoh.",
    requirements: ["Ringkasan kebutuhan", "Daftar indikator", "Kontak aktif"],
    procedure: "Pemohon memilih topik konsultasi, kemudian petugas PST menyiapkan sesi layanan.",
    tone: "green"
  },
  {
    title: "Permintaan Publikasi",
    description: "Akses katalog publikasi BPS untuk kebutuhan referensi, perencanaan, dan pelaporan.",
    requirements: ["Judul publikasi", "Periode data", "Format yang diinginkan"],
    procedure: "Cari publikasi, pilih format, lalu unduh atau ajukan bantuan ke petugas.",
    tone: "orange"
  },
  {
    title: "Rekomendasi Kegiatan Statistik",
    description: "Prototype informasi untuk pengajuan rekomendasi kegiatan statistik sektoral.",
    requirements: ["Rancangan kegiatan", "Instansi penyelenggara", "Instrumen pendataan"],
    procedure: "Dokumen rancangan ditelaah, lalu sistem menampilkan status proses secara demo.",
    tone: "sky"
  },
  {
    title: "Informasi Statistik",
    description: "Pusat jawaban cepat untuk definisi indikator, jadwal rilis, dan kategori data daerah.",
    requirements: ["Pertanyaan layanan", "Kategori statistik", "Kontak aktif"],
    procedure: "Kirim pertanyaan, sistem memberi nomor tiket contoh, petugas menindaklanjuti sesuai prioritas.",
    tone: "green"
  },
  {
    title: "Pengaduan",
    description: "Kanal prototype untuk menyampaikan kendala layanan statistik dan saran perbaikan.",
    requirements: ["Nama pelapor", "Uraian kendala", "Bukti pendukung jika ada"],
    procedure: "Isi formulir pengaduan, pantau status tiket, dan terima tanggapan petugas.",
    tone: "orange"
  }
];

export const activities: ActivityItem[] = [
  {
    title: "Sosialisasi Sensus Ekonomi",
    date: "12 September 2026",
    location: "Sekayu",
    category: "Sosialisasi",
    description: "Agenda contoh untuk memperkenalkan tahapan pendataan ekonomi kepada perangkat daerah dan mitra lapangan."
  },
  {
    title: "Pelatihan Pengolahan Data Kecamatan",
    date: "20 September 2026",
    location: "BPS Kabupaten Musi Banyuasin",
    category: "Pelatihan",
    description: "Kegiatan contoh peningkatan kapasitas pengolahan data statistik dasar dan sektoral."
  },
  {
    title: "Rapat Koordinasi Statistik Sektoral",
    date: "2 Oktober 2026",
    location: "Pemkab Musi Banyuasin",
    category: "Rapat",
    description: "Forum contoh sinkronisasi kebutuhan data pembangunan daerah dan rencana publikasi indikator prioritas."
  },
  {
    title: "Pendampingan Desa Cantik",
    date: "15 Oktober 2026",
    location: "Kecamatan Lais",
    category: "Pendampingan",
    description: "Contoh agenda pendampingan penguatan literasi data desa untuk kebutuhan tampilan prototype."
  }
];

export const adminKpis: StatisticCard[] = [
  {
    label: "Total Pengajuan",
    value: "124",
    helper: "Data contoh",
    tone: "sky"
  },
  {
    label: "Menunggu Verifikasi",
    value: "32",
    helper: "Perlu ditinjau",
    tone: "orange"
  },
  {
    label: "Disetujui",
    value: "78",
    helper: "Selesai verifikasi",
    tone: "green"
  },
  {
    label: "Perlu Perbaikan",
    value: "10",
    helper: "Menunggu revisi",
    tone: "orange"
  }
];

export const submissions: DesilSubmission[] = [
  {
    id: "DTSEN-001",
    name: "Ahmad Saputra",
    kecamatan: "Sekayu",
    desa: "Balai Agung",
    status: "Menunggu",
    date: "08/10/2026"
  },
  {
    id: "DTSEN-002",
    name: "Siti Aminah",
    kecamatan: "Sungai Lilin",
    desa: "Sungai Lilin Jaya",
    status: "Disetujui",
    date: "07/10/2026"
  },
  {
    id: "DTSEN-003",
    name: "Budi Hartono",
    kecamatan: "Bayung Lencir",
    desa: "Mendis",
    status: "Perlu Perbaikan",
    date: "06/10/2026"
  },
  {
    id: "DTSEN-004",
    name: "Marlina",
    kecamatan: "Lais",
    desa: "Teluk",
    status: "Ditolak",
    date: "05/10/2026"
  },
  {
    id: "DTSEN-005",
    name: "Rizky Pratama",
    kecamatan: "Tungkal Jaya",
    desa: "Pandan Sari",
    status: "Menunggu",
    date: "04/10/2026"
  }
];

export const officeInformation: OfficeInformation[] = [
  { label: "Wilayah", value: "Kabupaten Musi Banyuasin, Sumatera Selatan" },
  { label: "Jam layanan contoh", value: "Senin - Jumat, 08.00 - 15.30 WIB" },
  { label: "Kanal prototype", value: "Permintaan data, konsultasi statistik, publikasi, pengaduan, dan DTSEN" }
];

export const organizationUnits: string[] = [
  "Pimpinan",
  "Subbagian Umum",
  "Fungsi Statistik Sosial",
  "Fungsi Statistik Produksi",
  "Fungsi Neraca Wilayah",
  "Fungsi IPDS"
];

export const datasetExamples: DatasetExample[] = [
  { title: "Jumlah Penduduk Menurut Kecamatan", domain: "Sosial", period: "2025", status: "Data contoh" },
  { title: "Pertumbuhan Ekonomi Kabupaten", domain: "Ekonomi", period: "2025", status: "Data contoh" },
  { title: "Indikator Kemiskinan", domain: "Sosial", period: "2025", status: "Data contoh" }
];

export const footerContactInformation: string[] = [
  "BPS Kabupaten Musi Banyuasin, Sekayu, Sumatera Selatan.",
  "Jam layanan contoh: Senin - Jumat, 08.00 - 15.30 WIB."
];
