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
