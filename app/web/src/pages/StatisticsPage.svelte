<script lang="ts">
  import { datasetExamples, featuredIndicators, quickStatistics } from "../constants/prototype";
  import { toneClasses } from "../constants/styles";
  import type { TrendPoint } from "../types/prototype";

  function chartHeight(points: TrendPoint[], value: number) {
    const max = Math.max(...points.map((point) => point.value));
    const min = Math.min(...points.map((point) => point.value));
    const spread = Math.max(max - min, 1);

    return 24 + ((value - min) / spread) * 72;
  }
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Statistik & Data</div>
      <h1 class="page-heading">Dashboard indikator daerah</h1>
      <p class="mt-4 max-w-[70ch]">
        Ruang contoh untuk menyajikan indikator utama, tren ringkas, dan status
        ketersediaan data dalam format yang mudah dipindai.
      </p>
    </div>
    <div class="page-note">
      <strong class="font-bold">Data contoh</strong>
      <span class="text-sm">Angka pada halaman ini hanya dummy data untuk demonstrasi tampilan.</span>
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container">
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {#each quickStatistics as stat}
        <article class={["rounded-lg border border-border-default border-t-4 border-t-(--tone-color) bg-surface p-5 shadow-sm", toneClasses[stat.tone]]}>
          <span class="text-xs font-extrabold text-muted">{stat.helper}</span>
          <strong class="mt-2 block text-3xl leading-none font-bold text-ink">{stat.value}</strong>
          <p class="mt-2 font-bold">{stat.label}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-base py-12 md:py-16">
  <div class="page-container">
    <div class="mb-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <div class="section-kicker">Tren Contoh</div>
        <h2 class="section-heading">Indikator prioritas</h2>
      </div>
      <p class="max-w-[430px] text-muted">Mini chart berikut memakai data contoh, bukan publikasi resmi BPS.</p>
    </div>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {#each featuredIndicators as indicator}
        <article class={["rounded-lg border border-border-default border-t-4 border-t-(--tone-color) bg-surface p-5 shadow-sm", toneClasses[indicator.tone]]}>
          <div class="grid gap-1">
            <span class="font-extrabold text-(--tone-text)">{indicator.name}</span>
            <strong class="text-[2rem] leading-none font-bold text-ink">{indicator.value}</strong>
            <small class="font-bold text-muted">{indicator.unit}</small>
          </div>
          <p class="mt-2 text-sm">{indicator.note}</p>
          <div class="mt-4 grid h-[120px] grid-cols-5 items-end gap-2 border-t border-border-subtle pt-4" aria-label={`Tren ${indicator.name}`}>
            {#each indicator.trend as point}
              <div class="grid h-24 items-end justify-items-center gap-1.5">
                <span class="h-(--bar-height) w-full max-w-8 rounded-t-md rounded-b-sm bg-(--tone-color)" style={`--bar-height: ${chartHeight(indicator.trend, point.value)}px`}></span>
                <small class="text-[0.68rem] text-muted">{point.year}</small>
              </div>
            {/each}
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container overflow-hidden rounded-lg border border-border-default bg-surface shadow-sm">
    <div class="flex flex-col gap-4 border-b border-border-subtle p-4 md:flex-row md:items-center md:justify-between">
      <h2 class="text-xl font-bold text-ink">Katalog dataset contoh</h2>
      <span class="text-sm font-extrabold text-bps-orange-text">Bukan statistik resmi</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full min-w-[760px] border-collapse text-left text-sm [&_th]:sticky [&_th]:top-0 [&_th]:border-b [&_th]:border-border-subtle [&_th]:bg-surface-strong [&_th]:px-4 [&_th]:py-3.5 [&_th]:font-extrabold [&_th]:text-ink [&_td]:border-b [&_td]:border-border-subtle [&_td]:px-4 [&_td]:py-3.5">
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Domain</th>
            <th>Periode</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {#each datasetExamples as dataset}
            <tr>
              <td>{dataset.title}</td>
              <td>{dataset.domain}</td>
              <td>{dataset.period}</td>
              <td><span class="inline-flex min-h-7 items-center rounded-full bg-bps-sky-light px-2.5 text-xs font-extrabold text-bps-sky-text">{dataset.status}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>
