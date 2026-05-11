<script lang="ts" module>
  import type { ReadPublicLayoutProps } from "@niama/domain/functions/layouts";

  export type HeaderNavProps = { nav: ReadPublicLayoutProps["navs"][number] };
</script>

<script lang="ts">
  import { headerStore } from "@niama/ui/lib/stores/header";
  import { observeNavLink, THE_HEADER } from "@niama/ui/the-header";
  import { onMount } from "svelte";

  let { nav }: HeaderNavProps = $props();

  let ref: HTMLAnchorElement | null = $state(null);

  const handleOnMouseEnter = () => headerStore.actions.setHovered(nav.hash);

  onMount(() => {
    if (ref) return observeNavLink(nav.hash, ref);
  });
</script>

<a bind:this={ref} class={THE_HEADER.navLink()} href={`${nav.to}#${nav.hash}`} onmouseenter={handleOnMouseEnter}>
  <span class={THE_HEADER.stainContent()}>{nav.text}</span>
</a>
