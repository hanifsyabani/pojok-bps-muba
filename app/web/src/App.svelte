<script lang="ts">
  import { onMount } from "svelte";
  import SearchDialog from "./components/common/SearchDialog.svelte";
  import Footer from "./components/layout/footer.svelte";
  import Navbar from "./components/layout/navbar.svelte";
  import { navItems } from "./constants/navigation";
  import NavBottom from "./components/layout/nav-bottom.svelte";
  import { formatCurrentDate, normalizePath } from "./lib/utils";

  let currentPath = $state(normalizePath(typeof window === "undefined" ? "/" : window.location.pathname));
  let isNavbarScrolled = $state(false);
  let searchDialogOpen = $state(false);
  let toastMessage = $state<string | null>(null);
  let toastTimer: ReturnType<typeof setTimeout> | null = null;

  const activePage = $derived(navItems.find((item) => item.path === currentPath) ?? navItems[0]);
  const currentDate = formatCurrentDate();



  function navigate(path: string) {
    const nextPath = normalizePath(path);
    if (nextPath !== currentPath) {
      history.pushState({}, "", nextPath);
      currentPath = nextPath;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showToast(message: string) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage = message;
    toastTimer = setTimeout(() => {
      toastMessage = null;
    }, 2800);
  }

  onMount(() => {
    const handleScroll = () => {
      isNavbarScrolled = window.scrollY > 16;
    };

    const handlePopState = () => {
      currentPath = normalizePath(window.location.pathname);
      window.scrollTo({ top: 0 });
    };

    const handleShortcut = (event: KeyboardEvent) => {
      const isSearchShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (!isSearchShortcut) return;
      event.preventDefault();
      searchDialogOpen = true;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleShortcut);
      if (toastTimer) clearTimeout(toastTimer);
    };
  });
</script>

<svelte:head>
  <title>{activePage.label} - Pojok BPS Muba</title>
  <meta
    name="description"
    content="Pojok BPS Muba untuk layanan statistik dan perbaikan data desil DTSEN."
  />
</svelte:head>

<Navbar
  {currentPath}
  {currentDate}
  {isNavbarScrolled}
  bind:searchDialogOpen
  {navigate}
  {showToast}
/>

<NavBottom {currentPath} {navigate} {showToast} />

<Footer {navigate} {showToast} />
<SearchDialog bind:open={searchDialogOpen} {navigate} />

{#if toastMessage}
  <div class="fixed right-4 bottom-4 z-120 max-w-[min(380px,calc(100%-2rem))] rounded-lg border-l-4 border-bps-sky bg-surface px-4 py-3.5 font-extrabold text-ink shadow-lg" role="status" aria-live="polite">
    {toastMessage}
  </div>
{/if}
