<script lang="ts">
  import { cn, type WithElementRef } from "@niama/ui/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { CAROUSEL, getCarouselContext } from "./context";

  let { children, class: className, ref = $bindable(null), ...restProps }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

  const carousel = getCarouselContext();
</script>

<div
  bind:this={ref}
  aria-roledescription="slide"
  class={cn(CAROUSEL.item, className)}
  data-orientation={carousel.orientation()}
  data-slot="carousel-item"
  role="group"
  {...restProps}
>
  {@render children?.()}
</div>
