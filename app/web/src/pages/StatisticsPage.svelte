<script lang="ts">
  import HeaderPage from "../components/common/header-page.svelte";
  import MubaMap from "../components/stats/muba-map.svelte";

  import type { StatisticsPageProps } from "../types/components";

  let { navigate }: StatisticsPageProps = $props();
</script>

<HeaderPage
  title="Statistik"
  desc="Data, publikasi, dan indikator prioritas untuk Musi Banyuasin"
/>

<section class="bg-surface py-8 md:py-10">
  <MubaMap {navigate} />
</section>
