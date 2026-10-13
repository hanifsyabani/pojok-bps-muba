<script lang="ts">
  import FormDtsen from "../components/dtsen/form-dtsen.svelte";
  import { desilProcessSteps } from "../constants/desil";
  import type { ToastProps } from "../types/components";

  let { showToast }: ToastProps = $props();
</script>

<section class="border-b border-border-subtle bg-surface-strong py-12 md:pt-16 md:pb-14">
  <div class="page-container">
    <h1 class="page-heading">Form perbaikan data desil</h1>
    <p class="mt-4 max-w-[70ch] text-muted">
      Data dan dokumen disimpan pada layanan website. Penyimpanan pengajuan tidak
      langsung mengubah desil DTSEN.
    </p>
  </div>
</section>

<section class="bg-surface py-12 md:py-16">
  <div class="page-container grid items-start gap-5 xl:grid-cols-[330px_minmax(0,1fr)]">
    <aside class="border-b border-border-default pb-5 xl:sticky xl:top-32 xl:border-b-0 xl:pr-5">
      <h2 class="mb-2 text-[1rem] font-bold text-ink">Alur pengajuan website</h2>
      <ol class="my-4 list-decimal space-y-2 pl-5">
        {#each desilProcessSteps as step}
          <li>{step}</li>
        {/each}
      </ol>
    </aside>

    <FormDtsen {showToast} />
  </div>
</section>
