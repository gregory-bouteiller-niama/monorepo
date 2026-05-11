import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const SEPARATOR = {
  base: cva(`shrink-0 bg-border 
  data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full 
  data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch`),
};
