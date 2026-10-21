<script module lang="ts">
  let isMubaMapRegistered = false;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts/core";
  import { MapChart } from "echarts/charts";
  import { TooltipComponent } from "echarts/components";
  import { CanvasRenderer } from "echarts/renderers";
  import LoadingIndicator from "../common/loader.svelte";
  import {
    formatKecamatanName,
    getKecamatanRouteByGeoName,
    mubaKecamatanRoutes,
    mubaMapGeoJsonPath,
    mubaMapName
  } from "../../constants/maps";
  import type { MubaMapProps } from "../../types/components";

  type KecamatanGeoJson = {
    features?: Array<{ properties?: { nmkec?: string } }>;
  };

  type MapEventParams = {
    name?: string;
  };

  let { navigate }: MubaMapProps = $props();
  let mapElement: HTMLDivElement;
  let mapStatus = $state<"loading" | "ready" | "error">("loading");
  let chart: ReturnType<typeof echarts.init> | null = null;
  let focusedKecamatanIndex = $state(-1);

  echarts.use([MapChart, TooltipComponent, CanvasRenderer]);

  function clearMapFocus() {
    chart?.dispatchAction({ type: "downplay", seriesIndex: 0 });
    chart?.dispatchAction({ type: "hideTip" });
    focusedKecamatanIndex = -1;
  }

  function handleMapKeydown(event: KeyboardEvent) {
    if (mapStatus !== "ready" || !chart) return;

    if (event.key === "Enter" && focusedKecamatanIndex >= 0) {
      event.preventDefault();
      navigate(mubaKecamatanRoutes[focusedKecamatanIndex].path);
      return;
    }
    if (event.key === "Escape") {
      clearMapFocus();
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = focusedKecamatanIndex < 0 ? (direction === 1 ? 0 : -1) : focusedKecamatanIndex + direction;
    focusedKecamatanIndex = (nextIndex + mubaKecamatanRoutes.length) % mubaKecamatanRoutes.length;
    chart.dispatchAction({ type: "downplay", seriesIndex: 0 });
    chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: focusedKecamatanIndex });
    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: focusedKecamatanIndex });
  }

  onMount(() => {
    let disposed = false;
    let resizeObserver: ResizeObserver | null = null;

    async function renderMap() {
      try {
        const response = await fetch(mubaMapGeoJsonPath);
        if (!response.ok) throw new Error("GeoJSON tidak dapat dimuat.");

        const geoJson = (await response.json()) as KecamatanGeoJson;
        if (!geoJson.features?.length) throw new Error("GeoJSON tidak berisi wilayah kecamatan.");
        if (disposed) return;

        if (!isMubaMapRegistered) {
          echarts.registerMap(mubaMapName, geoJson as Parameters<typeof echarts.registerMap>[1]);
          isMubaMapRegistered = true;
        }
        const theme = getComputedStyle(mapElement);
        const color = (token: string) => theme.getPropertyValue(token).trim();
        chart = echarts.init(mapElement, null, { renderer: "canvas" });
        chart.setOption({
          animation: false,
          textStyle: { fontFamily: theme.fontFamily },
          tooltip: {
            trigger: "item",
            confine: true,
            backgroundColor: color("--color-surface"),
            borderColor: color("--color-border-default"),
            borderWidth: 1,
            padding: [12, 16],
            textStyle: { color: color("--color-ink"), fontSize: 12 },
            extraCssText: "border-radius: 6px; line-height: 1.6; white-space: normal; letter-spacing: 0;",
            formatter: (params: MapEventParams) => {
              const name = formatKecamatanName(params.name ?? "");
              return `<strong>Kecamatan ${name}</strong>`;
            }
          },
          series: [
            {
              type: "map",
              name: "Kecamatan",
              map: mubaMapName,
              nameProperty: "nmkec",
              roam: false,
              cursor: "pointer",
              layoutCenter: ["50%", "50%"],
              layoutSize: "92%",
              data: mubaKecamatanRoutes.map((route) => ({
                name: route.geoName,
                value: 1,
                itemStyle: { areaColor: color(route.colorToken) },
                emphasis: { itemStyle: { areaColor: color(route.colorToken) } }
              })),
              label: {
                show: true,
                formatter: (params: MapEventParams) => formatKecamatanName(params.name ?? "").replace(/ /g, "\n"),
                color: color("--color-ink"),
                fontSize: 11,
                fontWeight: 600,
                lineHeight: 13,
                textBorderColor: color("--color-surface"),
                textBorderWidth: 3
              },
              itemStyle: {
                borderColor: color("--color-surface"),
                borderWidth: 1.5
              },
              emphasis: {
                focus: "self",
                label: { show: true },
                itemStyle: {
                  borderColor: color("--color-ink"),
                  borderWidth: 2
                }
              },
              blur: {
                label: { show: true, opacity: 1 },
                itemStyle: { opacity: 0.55 }
              }
            }
          ]
        });

        chart.on("click", (params: MapEventParams) => {
          const route = getKecamatanRouteByGeoName(params.name ?? "");
          if (route) navigate(route.path);
        });

        resizeObserver = new ResizeObserver(() => chart?.resize());
        resizeObserver.observe(mapElement);
        mapStatus = "ready";
      } catch {
        mapStatus = "error";
      }
    }

    renderMap();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      chart?.dispose();
      chart = null;
    };
  });
</script>

<div class="page-container">
  <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border-default pb-4">
    <h2 class="text-lg font-bold leading-snug text-ink md:text-xl">Peta Kecamatan Musi Banyuasin</h2>
    <span class="shrink-0 text-xs font-semibold text-muted tabular-nums">{mubaKecamatanRoutes.length} kecamatan</span>
  </div>

  <p class="mt-3 text-xs text-muted sm:hidden">Geser peta ke samping untuk melihat seluruh kecamatan.</p>
  <div class="relative mt-5 h-135 overflow-x-auto overflow-y-hidden rounded-md bg-base sm:h-115 lg:h-135">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions (This map implements arrow-key selection and Enter navigation.) -->
    <div
      bind:this={mapElement}
      class="h-full min-w-140 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-bps-sky"
      role="application"
      tabindex="0"
      aria-keyshortcuts="ArrowLeft ArrowRight ArrowUp ArrowDown Enter Escape"
      aria-label={focusedKecamatanIndex >= 0
        ? `Kecamatan ${mubaKecamatanRoutes[focusedKecamatanIndex].name}`
        : `Peta kecamatan Kabupaten Musi Banyuasin: ${mubaKecamatanRoutes.map((route) => route.name).join(", ")}. Gunakan tombol panah untuk memilih kecamatan, Enter untuk membuka halaman, dan Escape untuk menutup tooltip.`}
      onkeydown={handleMapKeydown}
      onblur={clearMapFocus}
    ></div>

    {#if mapStatus === "loading"}
      <div class="absolute inset-0 grid place-items-center bg-base">
        <LoadingIndicator label="Memuat peta kecamatan..." />
      </div>
    {:else if mapStatus === "error"}
      <div class="absolute inset-0 grid place-items-center bg-bps-orange-light p-5 text-center text-sm font-bold text-bps-orange-text" role="status">
        Peta belum dapat dimuat. Periksa berkas GeoJSON di folder public/maps.
      </div>
    {/if}
  </div>

</div>
