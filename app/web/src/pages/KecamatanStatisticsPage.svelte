<script lang="ts">
  import {
    getKecamatanRouteFromPath,
    mubaKecamatanRoutes,
  } from "../constants/maps";
  import { contentSources } from "../constants/prototype";
  import type { KecamatanStatisticsPageProps } from "../types/components";

  let { currentPath, navigate }: KecamatanStatisticsPageProps = $props();
  const kecamatan = $derived(getKecamatanRouteFromPath(currentPath));
</script>

<svelte:head>
  <title
    >{kecamatan ? `Kecamatan ${kecamatan.name}` : "Kecamatan tidak ditemukan"} -
    Statistik & Data - Pojok BPS Muba</title
  >
</svelte:head>

<section class="bg-base py-12 md:py-16">
  <div class="page-container">
    <nav
      class="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted"
      aria-label="Breadcrumb"
    >
      <a
        class="font-bold text-bps-sky-text underline underline-offset-4"
        href="/statistik-data"
        onclick={(event) => {
          event.preventDefault();
          navigate("/statistik-data");
        }}
      >
        Statistik & Data
      </a>
      <span aria-hidden="true">/</span>
      <span
        >{kecamatan
          ? `Kecamatan ${kecamatan.name}`
          : "Kecamatan tidak ditemukan"}</span
      >
    </nav>

    <section
      class="rounded-lg border border-border-default bg-surface p-6 shadow-sm"
    >
      <div class="section-kicker">Statistik Kecamatan</div>
      {#if kecamatan}
        <h1 class="page-heading">Kecamatan {kecamatan.name}</h1>
        <p class="mt-4 max-w-[68ch] text-muted">
          Halaman ini disiapkan sebagai tujuan klik dari peta kecamatan. Data
          statistik khusus Kecamatan {kecamatan.name} belum ditampilkan karena sumber
          data lokal per kecamatan belum tersedia di website ini.
        </p>

        <div class="page-note mt-6">
          <strong>Data kecamatan belum tersedia</strong>
          <span>
            Gunakan publikasi BPS Kabupaten Musi Banyuasin untuk memeriksa tabel
            per kecamatan yang sudah dirilis resmi.
          </span>
        </div>

        <div class="mt-6 flex flex-col gap-3 md:flex-row">
          <a
            class="btn-primary"
            href={contentSources.annualPublication}
            target="_blank"
            rel="noopener noreferrer">Buka publikasi BPS</a
          >
          <a
            class="btn-secondary"
            href="/statistik-data"
            onclick={(event) => {
              event.preventDefault();
              navigate("/statistik-data");
            }}
          >
            Kembali ke peta
          </a>
        </div>
      {:else}
        <h1 class="page-heading">Kecamatan tidak ditemukan</h1>

        <a
          class="btn-primary mt-6"
          href="/statistik-data"
          onclick={(event) => {
            event.preventDefault();
            navigate("/statistik-data");
          }}
        >
          Buka peta kecamatan
        </a>
      {/if}
    </section>
  </div>
</section>
