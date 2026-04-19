<script lang="ts">
  import { cn, type WithElementRef } from "@niama/ui/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { CAROUSEL, getCarouselContext } from "./context";

  let {
    children,
    class: className,
    ref = $bindable(null),
    viewportClass = "",
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & { viewportClass?: string } = $props();

  const carousel = getCarouselContext();
</script>

<div bind:this={ref} class={cn(CAROUSEL.viewport, viewportClass)} data-slot="carousel-content" use:carousel.viewportAction>
  <div class={cn(CAROUSEL.content, className)} data-orientation={carousel.orientation()} {...restProps}>{@render children?.()}</div>
</div>
