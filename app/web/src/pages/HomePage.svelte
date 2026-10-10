<script lang="ts">
  import PortalNetwork from "../components/home/PortalNetwork.svelte";
  import { portalTopics, quickStatistics } from "../constants/prototype";
  import { toneClasses } from "../constants/styles";
  import type { NavigationProps } from "../types/components";

  let { navigate }: NavigationProps = $props();
</script>

<section class="border-b border-ink-line bg-ink py-12 text-inverse md:pt-16 md:pb-10">
  <div class="page-container grid justify-items-center gap-8">
    <div class="max-w-205 text-center">
      <h1 class="text-5xl leading-[1.12] font-bold md:text-6xl xl:text-[5.2rem]">Pojok BPS Muba</h1>
      <p class="mx-auto mt-4 max-w-190  text-base md:text-xl">
        Satu portal untuk melihat contoh statistik daerah, layanan data,
        kegiatan, dan form perbaikan data desil DTSEN Kabupaten Musi Banyuasin.
      </p>
      <div class="mt-7 flex flex-col justify-center gap-3 md:flex-row md:flex-wrap">
        <button type="button" class="btn-primary border-portal-accent bg-portal-accent text-ink hover:border-portal-text hover:bg-portal-text" onclick={() => navigate("/statistik-data")}>
          Jelajahi Data
        </button>
        <button type="button" class="btn-secondary border-ink-line bg-ink-soft text-portal-text hover:bg-ink-line" onclick={() => navigate("/perbaikan-data-desil")}>
          Form DTSEN
        </button>
      </div>
    </div>

    <PortalNetwork topics={portalTopics} {navigate} />
  </div>
</section>

<section class="border-y border-border-subtle bg-base py-6" aria-label="Statistik cepat">
  <div class="page-container grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    {#each quickStatistics as stat}
      <article class={["rounded-lg border border-border-default border-t-4 border-t-(--tone-color) bg-surface p-5 shadow-sm", toneClasses[stat.tone]]}>
        <span class="text-xs font-extrabold text-muted">{stat.helper}</span>
        <strong class="mt-2 block text-3xl leading-none font-bold text-ink">{stat.value}</strong>
        <p class="mt-2 font-bold">{stat.label}</p>
      </article>
    {/each}
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr]">
    <article class="grid content-start gap-4 rounded-lg border border-border-default border-t-4 border-t-bps-sky bg-surface p-5 shadow-sm">
      <div>
        <h2 class="text-xl leading-snug font-bold text-ink">Layanan statistik dibuat lebih mudah dipindai</h2>
      </div>
      <p class="text-sm">
        Beranda ini meniru rasa portal data: navigasi ringkas, pencarian cepat,
        visual peta topik, dan akses langsung ke layanan yang paling sering dibuka.
      </p>
    </article>

    <article class="grid content-start gap-2 rounded-lg border border-border-default border-t-4 border-t-bps-green bg-surface p-5 shadow-sm">
      <p class="text-sm">Semua angka, status, dan kegiatan adalah dummy content untuk review UI.</p>
    </article>

    <article class="grid content-start gap-2 rounded-lg border border-border-default border-t-4 border-t-bps-orange bg-surface p-5 shadow-sm">
      <p class="text-sm">Belum ada backend, autentikasi, database, atau unggah file nyata.</p>
    </article>
  </div>
</section>
