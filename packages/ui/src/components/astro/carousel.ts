/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { CAROUSEL } from "../shared/carousel";
export { default as Carousel, type Props as CarouselProps } from "./carousel/carousel.astro";
export { default as CarouselContent, type Props as CarouselContentProps } from "./carousel/content.astro";
export { default as CarouselItem, type Props as CarouselItemProps } from "./carousel/item.astro";
export { default as CarouselNext, type Props as CarouselNextProps } from "./carousel/next.astro";
export { default as CarouselPrevious, type Props as CarouselPreviousProps } from "./carousel/previous.astro";
export type { CarouselApi, CarouselManager, CarouselOptions } from "./carousel/utils";
export { initCarousel } from "./carousel/utils";
