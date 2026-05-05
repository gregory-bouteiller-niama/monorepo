import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const THE_FOOTER = {
  base: cva("pointer-events-none fixed bottom-4 mx-auto flex w-full justify-between self-center rounded-full px-4 py-2"),
  disclaimer: cva("pointer-events-auto backdrop-blur-xl"),
  social: cva("pointer-events-auto backdrop-blur-xl"),
  socials: cva("flex items-center gap-2"),
};
