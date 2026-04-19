<script lang="ts" module>
  import type { WithElementRef } from "@niama/ui/lib/utils";
  import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
  import type { HTMLAttributes } from "svelte/elements";

  export type CarouselProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    api?: EmblaCarouselType | null;
    opts?: EmblaOptionsType;
    orientation?: "horizontal" | "vertical";
    plugins?: EmblaPluginType[];
  };
</script>

<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import type { EmblaCarouselType as EmblaApi } from "embla-carousel";
  import useEmblaCarousel from "embla-carousel-svelte";
  import { writable } from "svelte/store";
  import { CAROUSEL, setCarouselContext } from "./context";

  let {
    api = $bindable(null),
    children,
    class: className,
    opts = {},
    orientation = "horizontal",
    plugins = [],
    ref = $bindable(null),
    ...restProps
  }: CarouselProps = $props();

  const canScrollPrev = writable(false);
  const canScrollNext = writable(false);
  const noop = () => undefined;
  let unbindApi = noop;
  let rootElement = $state<HTMLDivElement | null>(null);

  const syncState = (emblaApi: EmblaApi) => {
    canScrollPrev.set(emblaApi.canScrollPrev());
    canScrollNext.set(emblaApi.canScrollNext());
  };

  const bindApi = (emblaApi: EmblaApi) => {
    unbindApi();
    api = emblaApi;

    const handleSelect = () => {
      syncState(emblaApi);
    };

    syncState(emblaApi);
    emblaApi.on("reInit", handleSelect);
    emblaApi.on("select", handleSelect);

    unbindApi = () => {
      emblaApi.off("reInit", handleSelect);
      emblaApi.off("select", handleSelect);
    };
  };

  const viewportAction = (node: HTMLElement) => {
    const action = useEmblaCarousel(node, {
      options: { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
      plugins,
    });

    const handleEmblaInit = (event: Event) => {
      bindApi((event as CustomEvent<EmblaApi>).detail);
    };

    node.addEventListener("emblaInit", handleEmblaInit as EventListener);

    return {
      destroy() {
        node.removeEventListener("emblaInit", handleEmblaInit as EventListener);
        unbindApi();
        action?.destroy?.();
      },
    };
  };

  const scrollPrev = () => {
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  const handleWindowKeyDown = (event: KeyboardEvent) => {
    if (!rootElement?.contains(document.activeElement)) {
      return;
    }

    if (orientation === "vertical") {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        scrollNext();
      }

      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  setCarouselContext({
    canScrollNext,
    canScrollPrev,
    orientation: () => orientation,
    scrollNext,
    scrollPrev,
    viewportAction,
  });
</script>

<svelte:window onkeydown={handleWindowKeyDown} />

<div
  bind:this={rootElement}
  aria-roledescription="carousel"
  class={cn(CAROUSEL.base, className)}
  data-slot="carousel"
  role="region"
  {...restProps}
>
  {@render children?.()}
</div>
