<script lang="ts">
  import { initializeSky, SKY, SKY_ORBITS } from "@niama/ui/sky";
  import { cn } from "@niama/ui-svelte/utils";
  import { onMount } from "svelte";

  let { class: className = "" }: { class?: string } = $props();

  let container: HTMLDivElement | null = null;

  onMount(() => container && initializeSky(container));
</script>

<div aria-hidden="true" class={cn(SKY.base(), className)}>
  <div class={SKY.orbits()}>
    {#each SKY_ORBITS as orbit (orbit)}
      <div class={SKY.orbit()}><span class={SKY.planet()}></span></div>
    {/each}
  </div>
  <div bind:this={container} class={SKY.stars()}><canvas class={SKY.canvas()}></canvas></div>
</div>
