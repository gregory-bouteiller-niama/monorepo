<script lang="ts" module>
  import { CAROUSEL, type CarouselStore } from "@niama/ui/carousel";
  import type { WithElementRef } from "@niama/ui-svelte/lib/utils";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { setCarouselCtx } from "./context";

  export type CarouselProps = { store: CarouselStore } & WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
  let { ref = $bindable(null), store, class: className, children, ...restProps }: CarouselProps = $props();

  setCarouselCtx(untrack(() => store));
</script>

<section
  bind:this={ref}
  aria-roledescription="carousel"
  class={cn(CAROUSEL.base(), className)}
  data-axis={store.state.opts.axis ?? "x"}
  data-slot="carousel"
  onkeydowncapture={store.actions.handleKeydown}
  {...restProps}
>
  {@render children?.()}
</section>
