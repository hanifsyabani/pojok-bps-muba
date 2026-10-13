<script lang="ts">
  import { contentSources, officeInformation, organizationUnits, profileHighlights } from "../constants/prototype";
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Profil BPS</div>
      <h1 class="page-heading">Profil BPS Kabupaten Musi Banyuasin</h1>
      <p class="mt-4 max-w-[70ch]">
        Kenali peran BPS dalam penyediaan data statistik, pelayanan masyarakat,
        serta dukungan terhadap kebutuhan informasi daerah.
      </p>
    </div>
    <div class="page-note">
      <strong class="font-bold">Informasi kelembagaan</strong>
      <a class="text-sm underline underline-offset-4" href={contentSources.profile} target="_blank" rel="noopener noreferrer">Profil lengkap di PPID BPS Muba</a>
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container grid items-start gap-8 xl:grid-cols-[0.9fr_1.1fr]">
    <div>
      <h2 class="section-heading">Data statistik untuk pemerintah dan masyarakat</h2>
      <p class="mt-4 max-w-[70ch]">
        BPS menyelenggarakan statistik dasar dan membantu pemenuhan kebutuhan
        data untuk penelitian, perencanaan, serta pengambilan keputusan.
        Pelayanan Statistik Terpadu menjadi kanal akses data dan konsultasi bagi pengguna.
      </p>
    </div>

    <div class="grid gap-4 md:grid-cols-2">
      {#each profileHighlights as item}
        <article class="rounded-lg border border-border-default bg-surface p-5 shadow-sm">
          <h3 class="mb-2 text-base font-bold text-ink">{item.title}</h3>
          <p class="text-sm">{item.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-base py-12 md:py-16">
  <div class="page-container grid gap-4 md:grid-cols-2">
    <article class="rounded-lg border border-border-default bg-surface p-5 shadow-sm">
      <h2 class="mb-2 text-base font-bold text-ink">Informasi kantor</h2>
      <dl class="mt-4 grid gap-3.5">
        {#each officeInformation as information}
          <div class="grid gap-1 border-b border-border-subtle pb-3">
            <dt class="font-extrabold text-ink">{information.label}</dt>
            <dd>{information.value}</dd>
          </div>
        {/each}
      </dl>
      <a class="mt-4 inline-block text-sm font-bold text-bps-sky-text underline underline-offset-4" href={contentSources.website} target="_blank" rel="noopener noreferrer">Sumber informasi kantor</a>
    </article>

    <article class="rounded-lg border border-border-default bg-surface p-5 shadow-sm">
      <h2 class="mb-2 text-base font-bold text-ink">Struktur organisasi</h2>
      <div class="mt-4 grid gap-3 md:grid-cols-2 [&>span]:grid [&>span]:min-h-[46px] [&>span]:place-items-center [&>span]:rounded-lg [&>span]:border [&>span]:border-border-default [&>span]:bg-surface-strong [&>span]:p-2.5 [&>span]:text-center [&>span]:text-sm [&>span]:font-bold [&>span]:text-ink">
        {#each organizationUnits as unit}
          <span>{unit}</span>
        {/each}
      </div>
      <a class="mt-4 inline-block text-sm font-bold text-bps-sky-text underline underline-offset-4" href={contentSources.profile} target="_blank" rel="noopener noreferrer">Lihat struktur di PPID BPS</a>
    </article>
  </div>
</section>
