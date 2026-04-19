import { getContext, setContext } from "svelte";
import type { Action } from "svelte/action";
import type { Writable } from "svelte/store";

export const CAROUSEL = {
  base: "relative",
  content: "flex data-[orientation=vertical]:-mt-4 data-[orientation=horizontal]:-ml-4 data-[orientation=vertical]:flex-col",
  item: "min-w-0 shrink-0 grow-0 basis-full data-[orientation=vertical]:pt-4 data-[orientation=horizontal]:pl-4",
  next: "absolute touch-manipulation rounded-full data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-right-12 data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=vertical]:-bottom-12 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:rotate-90",
  previous:
    "absolute touch-manipulation rounded-full data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-left-12 data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=vertical]:-top-12 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:rotate-90",
  viewport: "overflow-hidden",
} as const;

type CarouselContext = {
  canScrollNext: Writable<boolean>;
  canScrollPrev: Writable<boolean>;
  orientation: () => "horizontal" | "vertical";
  scrollNext: () => void;
  scrollPrev: () => void;
  viewportAction: Action<HTMLElement>;
};

const CAROUSEL_CONTEXT = Symbol("svelte-carousel");

export function setCarouselContext(context: CarouselContext) {
  setContext(CAROUSEL_CONTEXT, context);
  return context;
}

export function getCarouselContext() {
  const context = getContext<CarouselContext>(CAROUSEL_CONTEXT);

  if (!context) {
    throw new Error("Carousel components must be used within <Carousel />");
  }

  return context;
}
