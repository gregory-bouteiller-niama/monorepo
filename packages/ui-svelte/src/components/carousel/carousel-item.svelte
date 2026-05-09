<script lang="ts">
  import { CAROUSEL } from "@niama/ui/carousel";
  import { cn, type WithElementRef } from "@niama/ui-svelte/utils";
  import type { HTMLAttributes } from "svelte/elements";

  let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLElement>> = $props();
</script>

<section
  bind:this={ref}
  data-slot="carousel-item"
  role="group"
  aria-roledescription="slide"
  class={cn(CAROUSEL.item(), className)}
  {...restProps}
>
  {@render children?.()}
</section>
