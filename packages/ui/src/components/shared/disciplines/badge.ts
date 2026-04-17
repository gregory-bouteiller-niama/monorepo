import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const DISCIPLINES_BADGE = cva(`font-normal text-sm
  data-[discipline=anima]:bg-anima
  data-[discipline=animus]:bg-animus
  data-[discipline=astro]:bg-astro
  data-[discipline=yogart]:bg-yogart
  `);
