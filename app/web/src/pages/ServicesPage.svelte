<script lang="ts">
  import { services } from "../constants/prototype";
  import { toneClasses } from "../constants/styles";
  import type { PageActionProps } from "../types/components";

  let { showToast, navigate }: PageActionProps = $props();
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
    <div>
      <div class="section-kicker">Layanan</div>
      <h1 class="page-heading">Katalog layanan publik</h1>
      <p class="mt-4 max-w-[70ch]">
        Prototype halaman layanan untuk permintaan data, konsultasi statistik,
        publikasi, pengaduan, dan kanal terkait kebutuhan data masyarakat.
      </p>
    </div>
    <div class="page-note">
      <span class="text-sm">Tombol layanan menampilkan simulasi interaksi, belum mengirim data ke server.</span>
    </div>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container">
    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {#each services as service}
        <article class={["relative flex flex-col gap-4 overflow-hidden rounded-lg border border-border-default bg-surface p-5 shadow-sm", toneClasses[service.tone]]}>
          <div class="absolute inset-y-0 left-0 w-1 bg-(--tone-color)"></div>
          <h2 class="text-base font-bold ">{service.title}</h2>
          <p class="text-sm">{service.description}</p>
          <div>
            <strong class="font-bold">Persyaratan</strong>
            <ul class="mt-2 list-disc pl-4 text-sm">
              {#each service.requirements as requirement}
                <li>{requirement}</li>
              {/each}
            </ul>
          </div>
          <small class="text-muted">{service.procedure}</small>
          <button type="button" class="w-fit rounded-lg border border-(--tone-border) bg-(--tone-light) px-3.5 py-2 text-sm font-extrabold text-(--tone-text) hover:brightness-95" onclick={() => showToast(`${service.title} masih berupa prototype UI.`)}>
            Detail layanan
          </button>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-base py-12 md:py-16">
  <div class="page-container grid items-center gap-8 xl:grid-cols-[1fr_auto]">
    <div>
      <div class="section-kicker">DTSEN</div>
      <h2 class="section-heading">Butuh perbaikan data desil?</h2>
      <p class="mt-4 max-w-[70ch]">
        Gunakan form Perbaikan Data Desil DTSEN untuk mensimulasikan pengisian
        data pemohon, unggah dokumen, dan tinjauan pengajuan.
      </p>
    </div>
    <button type="button" class="btn-primary" onclick={() => navigate("/perbaikan-data-desil")}>
      Buka Form DTSEN
    </button>
  </div>
</section>
