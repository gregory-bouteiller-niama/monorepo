import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const ICON_BUTTON = {
  base: cva("cursor-pointer"),
  icon: cva("group-data-[loading=true]/button:icon-[lucide--loader-2] size-5 group-data-[loading=true]/button:animate-spin"),
};
