<script lang="ts" module>
  import { CAROUSEL } from "@niama/ui/carousel";
  import { useSelector } from "@niama/ui-svelte/lib/store.svelte";
  import { cn, type WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { EmblaCarouselType } from "embla-carousel";
  import carousel from "embla-carousel-svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import CarouselClones from "./carousel-clones.svelte";
  import { getCarouselCtx } from "./context";

  export type CarouselContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & { viewportClass?: string };
</script>

<script lang="ts">
  let { ref = $bindable(null), class: className, viewportClass, children, ...restProps }: CarouselContentProps = $props();

  const store = getCarouselCtx();

  const opts = useSelector(store, (state) => state.opts);
  const plugins = useSelector(store, (state) => state.plugins);
  const allSlidesClipped = useSelector(store, (state) => state.allSlidesClipped);

  const handleInit = (event: CustomEvent<EmblaCarouselType>) => store.actions.bindApi(event.detail);
</script>

<div
  bind:this={ref}
  data-slot="carousel-content"
  class={cn(CAROUSEL.viewport(), viewportClass)}
  onemblainit={handleInit}
  use:carousel={{ options: opts.current, plugins: plugins.current }}
>
  <div class={cn(CAROUSEL.content(), className)} data-slot="carousel-container" {...restProps}>
    {@render children?.()}
    {#if allSlidesClipped.current}
      <CarouselClones>{@render children?.()}</CarouselClones>
    {/if}
  </div>
</div>
