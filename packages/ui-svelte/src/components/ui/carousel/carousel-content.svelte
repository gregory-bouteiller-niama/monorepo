<script lang="ts" module>
  import type { WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  export type CarouselContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & { viewportClass?: string };
</script>

<script lang="ts">
  import { CAROUSEL, CLONE_ATTR, CLONE_ATTRS, FOCUSABLE_SELECTOR, getOriginalSlideNodes } from "@niama/ui/carousel";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { useSelector } from "@tanstack/svelte-store";
  import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
  import carousel from "embla-carousel-svelte";
  import type { Action } from "svelte/action";
  import { getEmblaContext } from "./context";

  type EmblaCarouselConfig = {
    options: EmblaOptionsType;
    plugins: EmblaPluginType[];
  };

  let { ref = $bindable(null), class: className, viewportClass, children, ...restProps }: CarouselContentProps = $props();

  let containerRef = $state<HTMLElement | null>(null);
  const { store: carouselStore } = getEmblaContext();

  const opts = useSelector(carouselStore, (state) => state.opts);
  const plugins = useSelector(carouselStore, (state) => state.plugins);
  const api = useSelector(carouselStore, (state) => state.api);
  const allSlidesClipped = useSelector(carouselStore, (state) => state.allSlidesClipped);

  // let cleanupApi: () => void = () => undefined;

  // const onInit = (event: CustomEvent<EmblaCarouselType>) => {
  //   cleanupApi();
  //   cleanupApi = carouselStore.actions.bindApi(event.detail);
  // };

  // const initCarousel: Action<HTMLElement, EmblaCarouselConfig> = (node, config) => {
  //   const handleInit = (event: Event) => onInit(event as CustomEvent<EmblaCarouselType>);

  //   node.addEventListener("emblainit", handleInit);
  //   const action = emblaCarouselSvelte(node, config);

  //   return {
  //     destroy: () => {
  //       node.removeEventListener("emblainit", handleInit);
  //       action.destroy?.();
  //       cleanupApi();
  //       cleanupApi = () => undefined;
  //     },
  //     update: (nextConfig) => {
  //       action.update?.(nextConfig);
  //     },
  //   };
  // };

  // $effect(() => {
  //   const currentApi = api.current;
  //   const containerEl = containerRef;
  //   if (!(currentApi && containerEl)) return;
  //   const reInit = () => currentApi.reInit(opts.current, plugins.current);

  //   const removeClones = () => {
  //     for (const cloneEl of containerEl.querySelectorAll(`[${CLONE_ATTR}]`)) cloneEl.remove();
  //   };

  //   removeClones();

  //   if (!allSlidesClipped.current) {
  //     reInit();
  //     return removeClones;
  //   }

  //   const fragment = document.createDocumentFragment();

  //   for (const itemEl of getOriginalSlideNodes(currentApi.slideNodes())) {
  //     const cloneEl = itemEl.cloneNode(true);
  //     if (!(cloneEl instanceof HTMLElement)) continue;

  //     for (const [name, value] of Object.entries(CLONE_ATTRS)) cloneEl.setAttribute(name, `${value}`);
  //     cloneEl.setAttribute("inert", "");

  //     for (const focusableEl of cloneEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) {
  //       focusableEl.tabIndex = -1;
  //     }

  //     fragment.append(cloneEl);
  //   }

  //   containerEl.append(fragment);
  //   reInit();
  //   return removeClones;
  // });

  // $effect(() => () => {
  //   cleanupApi();
  // });
</script>

<div
  bind:this={ref}
  data-slot="carousel-content"
  class={cn(CAROUSEL.viewport(), viewportClass)}
  use:carousel={{
    options: {
      container: "[data-slot='carousel-container']",
      slides: "[data-slot='carousel-item']",
      ...opts.current,
    },
    plugins: plugins.current,
  }}
>
  <div bind:this={containerRef} class={cn(CAROUSEL.content(), className)} data-slot="carousel-container" {...restProps}>
    {@render children?.()}
  </div>
</div>
