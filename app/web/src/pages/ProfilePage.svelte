<script lang="ts">
  import { officeInformation, organizationUnits, profileHighlights } from "../constants/prototype";
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Profil BPS</div>
      <h1 class="page-heading">Profil BPS Kabupaten Musi Banyuasin</h1>
      <p class="mt-4 max-w-[70ch]">
        Halaman prototype untuk memperkenalkan identitas layanan, informasi kantor,
        struktur kelembagaan, dan kanal pelayanan BPS Kabupaten Musi Banyuasin.
      </p>
    </div>
    <div class="page-note">
      <strong class="font-bold">Bukan konten resmi</strong>
      <span class="text-sm">Materi profil final perlu divalidasi oleh BPS Kabupaten Musi Banyuasin sebelum publikasi.</span>
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container grid items-start gap-8 xl:grid-cols-[0.9fr_1.1fr]">
    <div>
      <h2 class="section-heading">Pojok BPS Muba sebagai wajah layanan digital</h2>
      <p class="mt-4 max-w-[70ch]">
        Prototype ini menempatkan konten kelembagaan dan layanan statistik dalam struktur
        yang mudah dibaca oleh masyarakat, perangkat daerah, akademisi, dan mitra kerja.
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
    </article>

    <article class="rounded-lg border border-border-default bg-surface p-5 shadow-sm">
      <h2 class="mb-2 text-base font-bold text-ink">Struktur konten</h2>
      <div class="mt-4 grid gap-3 md:grid-cols-2 [&>span]:grid [&>span]:min-h-[46px] [&>span]:place-items-center [&>span]:rounded-lg [&>span]:border [&>span]:border-border-default [&>span]:bg-surface-strong [&>span]:p-2.5 [&>span]:text-center [&>span]:text-sm [&>span]:font-bold [&>span]:text-ink">
        {#each organizationUnits as unit}
          <span>{unit}</span>
        {/each}
      </div>
    </article>
  </div>
</section>
