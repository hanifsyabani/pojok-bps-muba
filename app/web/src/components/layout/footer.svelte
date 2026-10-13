<script lang="ts">
  import { footerServiceLinks, navItems } from "../../constants/navigation";
  import { contentSources, footerContactInformation } from "../../constants/prototype";
  import type { PageActionProps } from "../../types/components";

  let { navigate, showToast }: PageActionProps = $props();
</script>

<footer class="bg-ink pt-12 text-portal-body">
  <div
    class="page-container grid gap-8 pb-10 md:grid-cols-2 xl:grid-cols-[1.35fr_0.8fr_0.95fr_1fr]"
  >
    <div>
      <div class="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo BPS"
          class="size-11 shrink-0 rounded-md bg-surface p-1 object-contain"
        />
        <div>
          <div class="text-base font-extrabold">Pojok BPS Muba</div>
        </div>
      </div>
      <p class="mt-4 max-w-[42ch] text-sm">
        Portal informasi statistik dan layanan untuk masyarakat Kabupaten Musi Banyuasin.
      </p>
      <a class="mt-3 inline-block text-sm underline underline-offset-4 hover:text-inverse" href={contentSources.website} target="_blank" rel="noopener noreferrer">Website BPS Kabupaten Musi Banyuasin</a>
    </div>

    <div>
      <h2 class="mb-3 text-base font-extrabold">Navigasi</h2>
      <ul class="flex flex-col items-start gap-2 text-sm">
        {#each navItems.slice(0, 4) as item}
          <li>
            <a
              href={item.path}
              class="text-left hover:text-inverse"
              onclick={(event) => {
                event.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <h2 class="mb-3 text-base font-extrabold">Layanan</h2>
      <ul class="flex flex-col items-start gap-2 text-sm">
        {#each footerServiceLinks as item}
          <li>
            <a
              href={item.path}
              class="text-left hover:text-inverse"
              onclick={(event) => {
                event.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <div>
      <h2 class="mb-3 text-base font-extrabold">Kontak</h2>
      <div class="space-y-2 text-sm">
        {#each footerContactInformation as information}
          <p>{information}</p>
        {/each}
      </div>
    </div>
  </div>

  <div class="border-t border-inverse/10 bg-ink-deep py-4 text-center text-sm">
    <span>© {new Date().getFullYear()} Pojok BPS Muba</span>
  </div>
</footer>
