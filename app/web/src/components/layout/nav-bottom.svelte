<script lang="ts">
  import ActivitiesPage from "../../pages/ActivitiesPage.svelte";
  import AdminDashboardPage from "../../pages/AdminDashboardPage.svelte";
  import DesilRepairPage from "../../pages/DesilRepairPage.svelte";
  import HomePage from "../../pages/HomePage.svelte";
  import ProfilePage from "../../pages/ProfilePage.svelte";
  import ServicesPage from "../../pages/ServicesPage.svelte";
  import StatisticsPage from "../../pages/StatisticsPage.svelte";
  import type { NavBottomProps } from "../../types/components";

  let { currentPath, navigate, showToast }: NavBottomProps = $props();
</script>

<main class="overflow-hidden">
  {#key currentPath}
    {#if currentPath === "/profil-bps"}
      <ProfilePage />
    {:else if currentPath === "/statistik-data"}
      <StatisticsPage />
    {:else if currentPath === "/layanan"}
      <ServicesPage {navigate} {showToast} />
    {:else if currentPath === "/perbaikan-data-desil"}
      <DesilRepairPage {showToast} />
    {:else if currentPath === "/kegiatan"}
      <ActivitiesPage />
    {:else if currentPath === "/admin-dashboard"}
      <AdminDashboardPage {showToast} />
    {:else}
      <HomePage {navigate} />
    {/if}
  {/key}
</main>
