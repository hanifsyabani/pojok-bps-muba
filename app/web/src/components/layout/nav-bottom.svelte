<script lang="ts">
  import ActivitiesPage from "../../pages/ActivitiesPage.svelte";
  import AdminDashboardPage from "../../pages/AdminDashboardPage.svelte";
  import DesilRepairPage from "../../pages/DesilRepairPage.svelte";
  import HomePage from "../../pages/HomePage.svelte";
  import KecamatanStatisticsPage from "../../pages/KecamatanStatisticsPage.svelte";
  import LoginPage from "../../pages/LoginPage.svelte";
  import StatisticsPage from "../../pages/StatisticsPage.svelte";
  import { loginRoute } from "../../constants/navigation";
  import { isKecamatanStatisticsPath } from "../../constants/maps";
  import type { NavBottomProps } from "../../types/components";

  let { currentPath, navigate, showToast }: NavBottomProps = $props();
</script>

<main class="overflow-hidden">
  {#key currentPath}
    {#if currentPath === loginRoute.path}
      <LoginPage {navigate} />
    {:else if currentPath === "/statistik-data"}
      <StatisticsPage {navigate} />
    {:else if isKecamatanStatisticsPath(currentPath)}
      <KecamatanStatisticsPage {currentPath} {navigate} />
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
