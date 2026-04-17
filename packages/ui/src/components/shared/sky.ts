import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const SKY = {
  base: cva("relative size-full"),
  canvas: cva("size-full"),
  orbit: cva(`group absolute animate-spin rounded-full border border-foreground/5 
  nth-1:size-1/4 nth-1:animation-duration-[60s] 
  nth-2:size-1/2 nth-2:animation-duration-[120s] nth-2:direction-reverse
  nth-3:size-3/4 nth-3:animation-duration-[110s]
  nth-4:size-11/12 nth-4:animation-duration-[90s] nth-4:direction-reverse
  `),
  orbits: cva(`pointer-events-none fixed top-1/2 left-1/2 -z-10 flex size-svw min-h-[1000px] min-w-[1000px] -translate-1/2
    items-center justify-center`),
  planet: cva(`absolute top-0 left-1/2 size-2.5 -translate-1/2 rounded-full 
    dark:bg-white
    group-nth-1:bg-yogart group-nth-1:shadow-[0_0_10px_2px_var(--yogart)]
    group-nth-2:bg-anima group-nth-2:shadow-[0_0_10px_2px_var(--anima)]
    group-nth-3:bg-animus group-nth-3:shadow-[0_0_10px_2px_var(--animus)]
    group-nth-4:bg-astro group-nth-4:shadow-[0_0_10px_2px_var(--astro)]
    `),
  stars: cva("absolute inset-0 size-full"),
};
