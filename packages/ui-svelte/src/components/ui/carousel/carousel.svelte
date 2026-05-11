<script lang="ts" module>
  import { CAROUSEL } from "@niama/ui/carousel";
  import type { WithElementRef } from "@niama/ui-svelte/lib/utils";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { untrack } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { type CarouselStore, setCarouselContext } from "./context";

  export type CarouselProps = { store: CarouselStore } & WithElementRef<HTMLAttributes<HTMLElement>>;
</script>

<script lang="ts">
  let { ref = $bindable(null), store, class: className, children, ...restProps }: CarouselProps = $props();

  const initialStore = untrack(() => store);
  setCarouselContext({ store: initialStore });
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
