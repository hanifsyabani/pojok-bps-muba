import type { PageRoute } from "../types/prototype";

export const navItems: PageRoute[] = [
  { path: "/", label: "Beranda" },
  { path: "/profil-bps", label: "Profil BPS", shortLabel: "Profil" },
  { path: "/statistik-data", label: "Statistik & Data", shortLabel: "Statistik" },
  { path: "/perbaikan-data-desil", label: "Perbaikan DTSEN", shortLabel: "DTSEN" },
  { path: "/kegiatan", label: "Kegiatan" },
];

export const footerServiceLinks: PageRoute[] = [
  { path: "/perbaikan-data-desil", label: "Perbaikan Data Desil DTSEN" },
];
