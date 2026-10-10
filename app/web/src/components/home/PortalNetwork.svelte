<script lang="ts">
  import { portalNetworkCenter as center } from "../../constants/prototype";
  import { toneClasses } from "../../constants/styles";
  import type { PortalNetworkProps } from "../../types/components";
  import type { PortalTopic } from "../../types/prototype";

  let { topics, navigate }: PortalNetworkProps = $props();

  function linkPath(topic: PortalTopic) {
    const midX = center.x + (topic.x - center.x) * 0.42;
    return `M ${center.x} ${center.y} C ${midX} ${center.y}, ${midX} ${topic.y}, ${topic.x} ${topic.y}`;
  }
</script>

<div class="relative grid w-full max-w-230 grid-cols-1 gap-3 pt-2 min-[360px]:grid-cols-2 lg:block lg:aspect-900/340 lg:pt-0" aria-label="Peta topik Pojok BPS Muba">
  <svg class="absolute inset-0 hidden size-full overflow-visible lg:block" viewBox="0 0 900 340" aria-hidden="true">
    {#each topics as topic}
      <path class="fill-none stroke-border-strong/25 stroke-[1.1]" d={linkPath(topic)} />
    {/each}
  </svg>

  <button type="button" class="relative col-span-full grid min-h-14.5 place-items-center rounded-lg border border-bps-sky/75 bg-ink-soft px-4 py-2 text-inverse shadow-md hover:bg-ink-line lg:absolute lg:top-[49.4%] lg:left-1/2 lg:w-52.5 lg:-translate-x-1/2 lg:-translate-y-1/2" onclick={() => navigate("/statistik-data")}>
    <strong class="text-base font-bold">Pojok BPS Muba</strong>
  </button>

  {#each topics as topic}
    <button
      type="button"
      class={["relative grid min-h-16 min-w-0 grid-cols-[18px_1fr] items-center gap-x-2 rounded-lg border border-transparent bg-ink-soft p-2 text-left text-inverse shadow-md hover:border-ink-line lg:absolute lg:top-(--node-y) lg:left-(--node-x) lg:min-h-14.5 lg:w-35 lg:-translate-x-1/2 lg:-translate-y-1/2", toneClasses[topic.tone]]}
      style={`--node-x: ${(topic.x / 900) * 100}%; --node-y: ${(topic.y / 340) * 100}%`}
      onclick={() => navigate(topic.path)}
    >
      <span class="row-span-2 size-3.5 rounded-full bg-(--tone-color) ring-4 ring-(--tone-color)/25" aria-hidden="true"></span>
      <strong class="text-xs leading-tight font-bold text-portal-text">{topic.label}</strong>
      <small class="text-[0.66rem] leading-tight text-portal-muted">{topic.helper}</small>
    </button>
  {/each}
</div>
