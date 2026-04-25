import { cva } from "class-variance-authority";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const CAROUSEL = {
  base: cva("group/carousel relative"),
  content: cva(`flex 
    group-data-[axis=y]/carousel:-mt-4 group-data-[axis=x]/carousel:-ml-4 
    group-data-[axis=y]/carousel:flex-col`),
  item: cva(`min-w-0 shrink-0 grow-0 basis-full 
    group-data-[axis=y]/carousel:pt-4 group-data-[axis=x]/carousel:pl-4`),
  next: cva(`absolute touch-manipulation rounded-full 
    group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-right-12 
    group-data-[axis=x]/carousel:-translate-y-1/2 group-data-[axis=y]/carousel:-bottom-12 
    group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 
    group-data-[axis=y]/carousel:rotate-90`),
  previous: cva(`absolute touch-manipulation rounded-full 
    group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-left-12 
    group-data-[axis=x]/carousel:-translate-y-1/2 group-data-[axis=y]/carousel:-top-12 
    group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 
    group-data-[axis=y]/carousel:rotate-90`),
  viewport: cva("overflow-hidden"),
} as const;

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const ALL_SLIDES_SHOWN_OPTS = { containScroll: false, slidesToScroll: "auto" } as const;
const DEFAULT_OPTS = { containScroll: "trimSnaps", slidesToScroll: 1 } as const;

// FUNCTIONS -------------------------------------------------------------------------------------------------------------------------------
export function getAdaptiveOpts(api: EmblaCarouselType) {
  const { containerRect, slideRects } = api.internalEngine();
  const canShowAllSlides = containerRect.right > (slideRects.at(-1)?.right ?? 0);
  return canShowAllSlides ? ALL_SLIDES_SHOWN_OPTS : DEFAULT_OPTS;
}

export function updateOpts(api: EmblaCarouselType) {
  return (opts: Partial<EmblaOptionsType>) => ({ ...opts, ...getAdaptiveOpts(api) });
}

// EVENTS ----------------------------------------------------------------------------------------------------------------------------------
export function getHandleClickPrev(api: EmblaCarouselType | undefined) {
  return () => api?.goToPrev();
}

export function getHandleClickNext(api: EmblaCarouselType | undefined) {
  return () => api?.goToNext();
}

export function getHandleKeydown(api: EmblaCarouselType | undefined, opts: EmblaOptionsType) {
  return (event: Pick<KeyboardEvent, "key" | "preventDefault">) => {
    const prevKey = opts.axis === "y" ? "ArrowUp" : "ArrowLeft";
    const nextKey = opts.axis === "y" ? "ArrowDown" : "ArrowRight";

    if (event.key === prevKey) {
      event.preventDefault();
      api?.goToPrev();
    } else if (event.key === nextKey) {
      event.preventDefault();
      api?.goToNext();
    }
  };
}
