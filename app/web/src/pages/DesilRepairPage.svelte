<script lang="ts">
  import HeaderPage from "../components/common/header-page.svelte";
  import FormDtsen from "../components/dtsen/form-dtsen.svelte";
  import { desilProcessSteps } from "../constants/desil";
  import type { ToastProps } from "../types/components";

  let { showToast }: ToastProps = $props();
</script>

<HeaderPage
  title="Pengajuan Perbaikan Desil"
  desc="Formulir pengajuan perbaikan desil"
/>

<section class="bg-surface py-12 md:py-16">
  <div
    class="page-container grid items-start gap-5 xl:grid-cols-[330px_minmax(0,1fr)]"
  >
    <aside
      class="border-b border-border-default pb-5 xl:sticky xl:top-32 xl:border-b-0 xl:pr-5"
    >
      <h2 class="mb-2 text-[1rem] font-bold text-ink">
        Alur pengajuan website
      </h2>
      <ol class="my-4 list-decimal space-y-2 pl-5">
        {#each desilProcessSteps as step}
          <li>{step}</li>
        {/each}
      </ol>
    </aside>

    <FormDtsen {showToast} />
  </div>
</section>
