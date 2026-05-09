/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { CAROUSEL } from "@niama/ui/carousel";
export { default as Carousel, type Props as CarouselProps } from "./carousel.astro";
export { default as CarouselContent, type Props as CarouselContentProps } from "./content.astro";
export { default as CarouselItem, type Props as CarouselItemProps } from "./item.astro";
export { default as CarouselNext, type Props as CarouselNextProps } from "./next.astro";
export { default as CarouselPrevious, type Props as CarouselPreviousProps } from "./previous.astro";
export { defineCarousel, initCarousel } from "./utils";
