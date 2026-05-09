import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const LOGO = {
  base: cva(`@container flex flex-col items-end font-logo text-primary
    data-[discipline=anima]:text-anima
    data-[discipline=animus]:text-animus
    data-[discipline=astro]:text-astro
    data-[discipline=yogart]:text-yogart
    `),
  mark: cva("w-full"),
  subtitle: cva("text-[20cqw] lowercase leading-none"),
  title: cva("text-[32cqw] text-foreground leading-none"),
};
