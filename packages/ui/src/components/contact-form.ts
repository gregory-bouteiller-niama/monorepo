import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const CONTACT = {
  card: cva("@container relative w-full max-w-xl border-0 ring-0"),
  description: cva("italic"),
  form: cva("flex w-full flex-col items-center gap-4"),
};
