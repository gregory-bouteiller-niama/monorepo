<script lang="ts" module>
  import { CAROUSEL } from "@niama/ui/carousel";
  import { cn, type WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import { getCarouselCloneCtx } from "./context";

  export type CarouselItemProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
  let { ref = $bindable(null), class: className, children, ...restProps }: CarouselItemProps = $props();

  const clone = getCarouselCloneCtx();
</script>

<section
  bind:this={ref}
  inert={clone}
  aria-hidden={clone}
  data-carousel-clone={clone ? "" : undefined}
  data-slot="carousel-item"
  role="group"
  aria-roledescription="slide"
  class={cn(CAROUSEL.item(), className)}
  {...restProps}
>
  {@render children?.()}
</section>
