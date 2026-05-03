import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const ATTENDANTS = {
  base: cva("w-full sm:px-12"),
  carousel: cva("flex w-full flex-col justify-center"),
  control: cva(`translate-0! static cursor-pointer 
    sm:absolute sm:-translate-y-1/2!`),
  controls: cva(`mt-4 flex w-32 justify-between self-center rounded-full border p-2 
    sm:mt-0 sm:border-none sm:p-0`),
  item: cva("max-w-[460px] basis-[min(460px,calc(100vw-2rem))] pl-4"),
  viewport: cva("overflow-x-clip overflow-y-visible py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"),
};

export const ATTENDANT = {
  base: cva("group/flip relative w-full cursor-pointer transition-transform duration-500 ease-in-out hover:rotate-0"),
  card: cva(`@container backface-hidden transform-3d flex-col-reverse gap-2 rounded-none bg-white py-3 shadow-2xl 
    transition-transform duration-500 min-h-0 w-full
    group-data-[flipped=true]/flip:rotate-y-180
    data-[back=true]:absolute data-[back=true]:inset-0 data-[back=true]:rotate-y-180 
    data-[back=true]:group-data-[flipped=true]/flip:rotate-y-0`),
  description: cva(`flex h-full min-h-0 w-full flex-1 flex-col justify-start gap-2 overflow-y-auto border-white border-x-12 p-4
    bg-card text-center font-light text-base 
    @sm:justify-center`),
  icon: cva("icon-[lucide--plus-circle] size-12 bg-white"),
  image: cva("relative aspect-square w-full px-3"),
  overlay:
    cva(`absolute inset-x-3 top-0 bottom-6 flex items-center justify-center opacity-0 backdrop-blur-2xl transition-opacity duration-500 
    group-hover/flip:opacity-100`),
  title: cva("font-bold text-3xl text-black"),
  badges: cva("flex justify-center gap-1"),
};

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
export const AUTOPLAY = 10_000;
export const ROTATIONS = [
  "md:-rotate-7",
  "md:rotate-3",
  "md:-rotate-5",
  "md:rotate-2",
  "md:-rotate-3",
  "md:rotate-8",
  "md:-rotate-1",
  "md:rotate-6",
];
