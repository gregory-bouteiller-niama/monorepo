import { cva } from "class-variance-authority";

export const SECTION = {
  base: cva("relative flex w-full flex-col items-center gap-4 pb-8"),
  description: cva("mb-12 max-w-4xl text-center font-light text-lg text-muted-foreground sm:text-xl"),
  separator: cva("self-center! h-24"),
  title: cva("text-center font-heading text-6xl"),
};
