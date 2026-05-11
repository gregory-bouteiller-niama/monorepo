<script lang="ts" module>
  import type { WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";
  import type { CarouselOptions, CarouselPlugins, CarouselStore } from "./context";

  export type CarouselProps = { opts?: CarouselOptions; plugins?: CarouselPlugins; store?: CarouselStore } & WithElementRef<
    HTMLAttributes<HTMLElement>
  >;
</script>

<script lang="ts">
  import { CAROUSEL, createCarouselStore } from "@niama/ui/carousel";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { useSelector } from "@tanstack/svelte-store";
  import { setEmblaContext } from "./context";

  let { ref = $bindable(null), store, opts = {}, plugins = [], class: className, children, ...restProps }: CarouselProps = $props();

  const carouselStore = store ?? createCarouselStore(opts, plugins);
  const carouselOpts = useSelector(carouselStore, (state) => state.opts);

  setEmblaContext({ store: carouselStore });

  $effect(() => {
    if (store) return;
    carouselStore.setState((prev) => ({ ...prev, opts, plugins }));
    carouselStore.state.api?.reInit(opts, plugins);
  });
</script>

<section
  bind:this={ref}
  aria-roledescription="carousel"
  class={cn(CAROUSEL.base(), className)}
  data-axis={carouselOpts.current.axis ?? "x"}
  data-slot="carousel"
  onkeydowncapture={carouselStore.actions.handleKeydown}
  role="region"
  {...restProps}
>
  {@render children?.()}
</section>
