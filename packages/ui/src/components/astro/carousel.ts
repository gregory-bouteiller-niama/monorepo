/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva } from "class-variance-authority";
import CarouselComponent from "./carousel/Carousel.astro";
import CarouselContentComponent from "./carousel/CarouselContent.astro";
import CarouselItemComponent from "./carousel/CarouselItem.astro";
import CarouselNextComponent from "./carousel/CarouselNext.astro";
import CarouselPreviousComponent from "./carousel/CarouselPrevious.astro";
import { initCarousel as initCarouselComponent } from "./carousel/carousel-script";

export const carousel = cva("starwind-carousel group/carousel relative");
export const carouselContent = cva("overflow-hidden");
export const carouselContainer = cva([
  "flex group-data-[axis=y]/carousel:flex-col",
  "group-data-[axis=x]/carousel:-ml-4",
  "group-data-[axis=y]/carousel:-mt-4",
]);
export const carouselItem = cva([
  "min-w-0 shrink-0 grow-0 basis-full",
  "group-data-[axis=x]/carousel:pl-4",
  "group-data-[axis=y]/carousel:pt-4",
]);
export const carouselNext = cva([
  "starwind-carousel-next absolute size-8 rounded-full",
  "group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-right-12 group-data-[axis=x]/carousel:-translate-y-1/2",
  "group-data-[axis=y]/carousel:-bottom-12 group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 group-data-[axis=y]/carousel:rotate-90",
]);
export const carouselPrevious = cva([
  "starwind-carousel-previous absolute size-8 rounded-full",
  "group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-left-12 group-data-[axis=x]/carousel:-translate-y-1/2",
  "group-data-[axis=y]/carousel:-top-12 group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 group-data-[axis=y]/carousel:rotate-90",
]);

const CarouselVariants = {
  carousel,
  carouselContent,
  carouselContainer,
  carouselItem,
  carouselNext,
  carouselPrevious,
};

export { default as Carousel } from "./carousel/Carousel.astro";
export { default as CarouselContent } from "./carousel/CarouselContent.astro";
export { default as CarouselItem } from "./carousel/CarouselItem.astro";
export { default as CarouselNext } from "./carousel/CarouselNext.astro";
export { default as CarouselPrevious } from "./carousel/CarouselPrevious.astro";
export type { CarouselApi, CarouselManager, CarouselOptions } from "./carousel/carousel-script";
export { initCarousel } from "./carousel/carousel-script";
export { CarouselVariants };

export default {
  get Root() {
    return CarouselComponent;
  },
  get Content() {
    return CarouselContentComponent;
  },
  get Item() {
    return CarouselItemComponent;
  },
  get Next() {
    return CarouselNextComponent;
  },
  get Previous() {
    return CarouselPreviousComponent;
  },
  get init() {
    return initCarouselComponent;
  },
};
