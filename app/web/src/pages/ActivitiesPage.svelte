<script lang="ts">
  import { activities } from "../constants/prototype";
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Kegiatan</div>
      <h1 class="page-heading">Agenda dan aktivitas BPS Muba</h1>
      <p class="mt-4 max-w-[70ch]">
        Halaman contoh untuk menampilkan kegiatan, pelatihan, sosialisasi, dan
        koordinasi statistik dalam format daftar yang mudah diperbarui.
      </p>
    </div>
    <div class="page-note">
      <strong class="font-bold">Dummy content</strong>
      <span class="text-sm">Agenda di bawah ini dibuat untuk kebutuhan tampilan prototype.</span>
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
        </div>
      </article>
    {/each}
  </div>
</section>

<section class="bg-base py-12 md:py-16">
  <div class="page-container grid gap-4">
    <h2 class="section-heading">Ruang arsip kegiatan</h2>
    <p class="max-w-[70ch]">
      State kosong ini disiapkan untuk periode ketika belum ada kegiatan terbaru
      atau filter arsip belum menghasilkan data.
    </p>
    <div class="rounded-lg border border-bps-orange-border bg-bps-orange-light p-4 text-sm text-bps-orange-text">Belum ada arsip yang sesuai filter contoh.</div>
  </div>
</section>
