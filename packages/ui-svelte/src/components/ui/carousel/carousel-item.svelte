<script lang="ts" module>
  import type { WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  export type CarouselItemProps = WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
  import { CAROUSEL } from "@niama/ui/carousel";
  import { cn } from "@niama/ui-svelte/lib/utils";

  let { ref = $bindable(null), class: className, children, ...restProps }: CarouselItemProps = $props();
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
