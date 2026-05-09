<script lang="ts">
  import { CAROUSEL, createCarouselStore } from "@niama/ui/carousel";
  import { cn, type WithElementRef } from "@niama/ui-svelte/utils";
  import { useSelector as readStore } from "@tanstack/svelte-store";
  import { type CarouselProps, setEmblaContext } from "./context";

  let {
    ref = $bindable(null),
    store,
    opts = {},
    plugins = [],
    class: className,
    children,
    ...restProps
  }: WithElementRef<CarouselProps> = $props();

  const carouselStore = store ?? createCarouselStore(opts, plugins);
  const carouselOpts = readStore(carouselStore, (state) => state.opts);

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
