import type { SearchItem } from "../types/prototype";
import { navItems } from "./navigation";
import { activities, featuredIndicators, services } from "./prototype";

export const searchItems: SearchItem[] = [
  ...navItems.map((item) => ({ title: item.label, category: "Halaman", path: item.path })),
  ...services.map((item) => ({ title: item.title, category: "Layanan", path: "/layanan" })),
  ...activities.map((item) => ({ title: item.title, category: item.category, path: "/kegiatan" })),
  ...featuredIndicators.map((item) => ({ title: item.name, category: "Statistik", path: "/statistik-data" }))
];
