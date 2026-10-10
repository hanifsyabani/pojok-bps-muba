import { navItems } from "../constants/navigation";

  const validPaths = new Set(navItems.map((item) => item.path));


export  function normalizePath(path: string) {
    const cleaned = path.replace(/\/+$/, "") || "/";
    return validPaths.has(cleaned) ? cleaned : "/";
  }

export  function formatCurrentDate() {
    return `${new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta"
    }).format(new Date())} - WIB`;
  }