import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const DISCIPLINES = {
  base: cva("w-full sm:px-12"),
  carousel: cva("flex w-full flex-col justify-center"),
  control: cva(`translate-0! static cursor-pointer 
    sm:absolute sm:-translate-y-1/2!`),
  controls: cva(`mt-4 flex w-32 justify-between self-center rounded-full border p-2 
    sm:mt-0 sm:border-none sm:p-0`),
  item: cva("@container max-w-2xl basis-full lg:basis-1/2 2xl:basis-1/2"),
};

export const DISCIPLINE = {
  base: cva("h-full @lg:flex-row flex-col gap-6 bg-card p-6"),
  content: cva("gap-1"),
  description: cva("line-clamp-none text-pretty text-center @lg:text-start font-light text-base text-foreground"),
  media: cva("self-center!"),
  title: cva("mb-3 @lg:self-start self-center font-bold font-heading text-3xl"),
  logo: cva("w-32"),
};

export const AUTOPLAY = 10_000;
