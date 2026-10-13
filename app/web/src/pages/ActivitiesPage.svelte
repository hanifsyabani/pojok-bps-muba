<script lang="ts">
  import { activities, contentSources } from "../constants/prototype";
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Kegiatan</div>
      <h1 class="page-heading">Kegiatan BPS Muba</h1>
      <p class="mt-4 max-w-[70ch]">
        Dokumentasi koordinasi daerah, pengembangan pengetahuan, dan kegiatan
        statistik BPS Kabupaten Musi Banyuasin.
      </p>
    </div>
    <div class="page-note">
      <strong class="font-bold">Dokumentasi kegiatan</strong>
      <span class="text-sm">Ringkasan berikut merujuk berita BPS. Tanggal menunjukkan waktu kegiatan, bukan jadwal mendatang.</span>
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container grid gap-4">
    {#each activities as activity}
      <article class="grid items-stretch gap-4 rounded-lg border border-border-default bg-surface p-5 shadow-sm md:grid-cols-[146px_1fr]">
        <div class="grid min-h-[92px] place-items-center rounded-lg bg-bps-sky-light p-3 text-center font-extrabold text-bps-sky-text md:min-h-32">{activity.category}</div>
        <div>
          <span class="mb-1.5 block text-xs font-extrabold text-muted">{activity.date} - {activity.location}</span>
          <h2 class="mb-2 text-base font-bold text-ink">{activity.title}</h2>
          <p class="text-sm">{activity.description}</p>
          <a class="mt-3 inline-block text-sm font-bold text-bps-sky-text underline underline-offset-4" href={activity.sourceUrl} target="_blank" rel="noopener noreferrer">Baca berita di BPS Muba</a>
        </div>
      </article>
    {:else}
      <p class="text-muted">Belum ada dokumentasi kegiatan yang tersedia.</p>
    {/each}
  </div>
</section>

<section class="bg-base py-12 md:py-16">
  <div class="page-container grid gap-4">
    <h2 class="section-heading">Berita dan kegiatan lainnya</h2>
    <p class="max-w-[70ch]">
      Telusuri berita, siaran pers, dan dokumentasi kegiatan lainnya melalui
      kanal berita BPS Kabupaten Musi Banyuasin.
    </p>
    <a class="btn-secondary" href={contentSources.news} target="_blank" rel="noopener noreferrer">Buka berita BPS Muba</a>
  </div>
</section>
