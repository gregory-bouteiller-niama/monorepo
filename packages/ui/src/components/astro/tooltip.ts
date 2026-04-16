/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva } from "class-variance-authority";

export const TOOLTIP = {
  base: cva("starwind-tooltip relative inline-block"),
  content: cva([
    "starwind-tooltip-content",
    "group fixed z-50 hidden w-fit px-3 py-1.5",
    "rounded-md bg-foreground text-background",
    "fade-in zoom-in-95 animate-in",
    "fade-out zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards",
    "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
    "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
  ]),
  caret: cva([
    "absolute z-50 size-4 text-foreground",
    "group-data-[side=top]:bottom-0 group-data-[side=top]:left-1/2 group-data-[side=top]:-translate-x-1/2 group-data-[side=top]:translate-y-[calc(50%+1px)] group-data-[side=top]:rotate-180",
    "group-data-[side=bottom]:top-0 group-data-[side=bottom]:left-1/2 group-data-[side=bottom]:-translate-x-1/2 group-data-[side=bottom]:-translate-y-[calc(50%+1px)]",
    "group-data-[side=left]:top-1/2 group-data-[side=left]:right-0 group-data-[side=left]:translate-x-[calc(50%+1px)] group-data-[side=left]:-translate-y-1/2 group-data-[side=left]:rotate-90",
    "group-data-[side=right]:top-1/2 group-data-[side=right]:left-0 group-data-[side=right]:-translate-x-[calc(50%+1px)] group-data-[side=right]:-translate-y-1/2 group-data-[side=right]:-rotate-90",
  ]),
  caretIcon: cva("icon-[tabler--caret-up]"),
} as const;

export { default as Tooltip, type Props as TooltipProps } from "./tooltip/Tooltip.astro";
export { default as TooltipContent, type Props as TooltipContentProps } from "./tooltip/TooltipContent.astro";
export { default as TooltipTrigger, type Props as TooltipTriggerProps } from "./tooltip/TooltipTrigger.astro";
