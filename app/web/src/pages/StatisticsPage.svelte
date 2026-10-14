<script lang="ts">
  import HeaderPage from "../components/common/header-page.svelte";
  import MubaMap from "../components/stats/muba-map.svelte";
  import {
    datasetExamples,
    featuredIndicators,
    quickStatistics,
  } from "../constants/prototype";
  import { toneClasses } from "../constants/styles";
  import type { StatisticsPageProps } from "../types/components";
  import type { TrendPoint } from "../types/prototype";

  let { navigate }: StatisticsPageProps = $props();

  function chartHeight(points: TrendPoint[], value: number) {
    const max = Math.max(...points.map((point) => point.value));
    const min = Math.min(...points.map((point) => point.value));
    const spread = Math.max(max - min, 1);

    return 24 + ((value - min) / spread) * 72;
  }
</script>

<HeaderPage
  title="Statistik"
  desc="Data, publikasi, dan indikator prioritas untuk Musi Banyuasin"
/>

<section class="bg-surface py-8 md:py-10">
  <MubaMap {navigate} />
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container">
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {#each quickStatistics as stat}
        <article
          class={[
            "rounded-lg border border-border-default border-t-4 border-t-(--tone-color) bg-surface p-5 shadow-sm",
            toneClasses[stat.tone],
          ]}
        >
          <span class="text-xs font-extrabold text-muted">{stat.helper}</span>
          <strong class="mt-2 block text-3xl leading-none font-bold text-ink"
            >{stat.value}</strong
          >
          <p class="mt-2 font-bold">{stat.label}</p>
          {#if stat.sourceUrl}
            <a
              class="mt-3 inline-block text-xs font-bold text-bps-sky-text underline underline-offset-4"
              href={stat.sourceUrl}
              target="_blank"
              rel="noopener noreferrer">Sumber BPS</a
            >
          {/if}
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-base py-12 md:py-16">
  <div class="page-container">
    <div
      class="mb-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div class="section-kicker">Tren 2023-2025</div>
        <h2 class="section-heading">Indikator prioritas</h2>
      </div>
      <p class="max-w-107.5 text-muted">
        Skala setiap grafik mengikuti rentang indikatornya. Gunakan angka dan
        satuan untuk membandingkan nilai.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {#each featuredIndicators as indicator}
        <article
          class={[
            "rounded-lg border border-border-default border-t-4 border-t-(--tone-color) bg-surface p-5 shadow-sm",
            toneClasses[indicator.tone],
          ]}
        >
          <div class="grid gap-1">
            <span class="font-extrabold text-(--tone-text)"
              >{indicator.name}</span
            >
            <strong class="text-[2rem] leading-none font-bold text-ink"
              >{indicator.value}</strong
            >
            <small class="font-bold text-muted">{indicator.unit}</small>
          </div>
          <p class="mt-2 text-sm">{indicator.note}</p>
          <div
            class="mt-4 grid h-40 grid-cols-3 items-end gap-2 border-t border-border-subtle pt-4"
            role="img"
            aria-label={`Tren ${indicator.name}: ${indicator.trend.map((point) => `${point.year}: ${point.value.toLocaleString("id-ID")} ${indicator.unit}`).join(", ")}`}
          >
            {#each indicator.trend as point}
              <div
                class="grid h-full min-w-0 grid-rows-[20px_1fr_20px] justify-items-center gap-1"
                aria-hidden="true"
              >
                <small class="text-[0.68rem] font-bold text-ink"
                  >{point.value.toLocaleString("id-ID")}</small
                >
                <div class="grid w-full place-items-end justify-items-center">
                  <span
                    class="h-(--bar-height) w-full max-w-8 rounded-t-md rounded-b-sm bg-(--tone-color)"
                    style={`--bar-height: ${chartHeight(indicator.trend, point.value)}px`}
                  ></span>
                </div>
                <small class="text-[0.68rem] text-muted">{point.year}</small>
              </div>
            {/each}
          </div>
          <a
            class="mt-3 inline-block text-xs font-bold text-bps-sky-text underline underline-offset-4"
            href={indicator.sourceUrl}
            target="_blank"
            rel="noopener noreferrer">Sumber: Dalam Angka 2026, hlm. xxxix</a
          >
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div
    class="page-container overflow-hidden rounded-lg border border-border-default bg-surface shadow-sm"
  >
    <div
      class="flex flex-col gap-4 border-b border-border-subtle p-4 md:flex-row md:items-center md:justify-between"
    >
      <h2 class="text-xl font-bold text-ink">Publikasi dan tabel statistik</h2>
      <span class="text-sm font-extrabold text-bps-sky-text"
        >Sumber BPS Kabupaten Musi Banyuasin</span
      >
    </div>
    <div class="overflow-x-auto">
      <table
        class="w-full min-w-190 border-collapse text-left text-sm [&_th]:sticky [&_th]:top-0 [&_th]:border-b [&_th]:border-border-subtle [&_th]:bg-surface-strong [&_th]:px-4 [&_th]:py-3.5 [&_th]:font-extrabold [&_th]:text-ink [&_td]:border-b [&_td]:border-border-subtle [&_td]:px-4 [&_td]:py-3.5"
      >
        <thead>
          <tr>
            <th>Judul</th>
            <th>Domain</th>
            <th>Periode</th>
            <th>Jenis sumber</th>
          </tr>
        </thead>
        <tbody>
          {#each datasetExamples as dataset}
            <tr>
              <td
                ><a
                  class="font-bold text-bps-sky-text underline underline-offset-4"
                  href={dataset.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer">{dataset.title}</a
                ></td
              >
              <td>{dataset.domain}</td>
              <td>{dataset.period}</td>
              <td
                ><span
                  class="inline-flex min-h-7 items-center rounded-full bg-bps-sky-light px-2.5 text-xs font-extrabold text-bps-sky-text"
                  >{dataset.status}</span
                ></td
              >
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
