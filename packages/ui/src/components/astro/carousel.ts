/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva } from "class-variance-authority";

export const CAROUSEL = {
  base: cva("starwind-carousel group/carousel relative"),
  content: cva("overflow-hidden"),
  container: cva(`flex 
    group-data-[axis=y]/carousel:flex-col group-data-[axis=x]/carousel:-ml-4 group-data-[axis=y]/carousel:-mt-4`),
  item: cva(`min-w-0 shrink-0 grow-0 basis-full 
    group-data-[axis=x]/carousel:pl-4 group-data-[axis=y]/carousel:pt-4`),
  next: cva(
    `starwind-carousel-next absolute size-8 rounded-full 
    group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-right-12 group-data-[axis=x]/carousel:-translate-y-1/2 
    group-data-[axis=y]/carousel:-bottom-12 group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 
    group-data-[axis=y]/carousel:rotate-90`
  ),
  previous: cva(
    `starwind-carousel-previous absolute size-8 rounded-full 
    group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-left-12 group-data-[axis=x]/carousel:-translate-y-1/2 
    group-data-[axis=y]/carousel:-top-12 group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 
    group-data-[axis=y]/carousel:rotate-90`
  ),
} as const;

export { default as Carousel, type Props as CarouselProps } from "./carousel/carousel.astro";
export { default as CarouselContent, type Props as CarouselContentProps } from "./carousel/content.astro";
export { default as CarouselItem, type Props as CarouselItemProps } from "./carousel/item.astro";
export { default as CarouselNext, type Props as CarouselNextProps } from "./carousel/next.astro";
export { default as CarouselPrevious, type Props as CarouselPreviousProps } from "./carousel/previous.astro";
export type { CarouselApi, CarouselManager, CarouselOptions } from "./carousel/utils";
export { initCarousel } from "./carousel/utils";
