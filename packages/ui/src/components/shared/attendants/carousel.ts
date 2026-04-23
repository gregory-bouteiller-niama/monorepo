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
  base: cva("group/flip relative cursor-pointer transition-transform duration-500 ease-in-out hover:rotate-0"),
  card: cva(`backface-hidden transform-3d flex-col-reverse gap-2 rounded-none bg-white py-3 shadow-2xl transition-transform duration-500 
    group-data-[flipped=true]/flip:rotate-y-180
    data-[back=true]:absolute data-[back=true]:inset-0 data-[back=true]:rotate-y-180 
    data-[back=true]:group-data-[flipped=true]/flip:rotate-y-0`),
  description: cva("mx-3 flex aspect-square w-[420px] flex-1 flex-col justify-center gap-2 bg-card text-center font-light text-base"),
  icon: cva("icon-[lucide--plus-circle] size-12"),
  image: cva("relative mx-3 aspect-square w-[420px] px-0"),
  overlay: cva(
    "absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-2xl transition-opacity duration-500 group-hover/flip:opacity-100"
  ),
  title: cva("font-bold text-3xl text-black"),
  badges: cva("flex justify-center gap-1"),
};

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
export const AUTOPLAY = 10_000;
export const ROTATIONS = ["-rotate-7", "rotate-3", "-rotate-5", "rotate-2", "-rotate-3", "rotate-8", "-rotate-1", "rotate-6"];
