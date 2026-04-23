/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { TOOLTIP } from "./tooltip/styles";

export { default as TooltipContent, type Props as TooltipContentProps } from "./tooltip/content.astro";
export { default as Tooltip, type Props as TooltipProps } from "./tooltip/tooltip.astro";
export { default as TooltipTrigger, type Props as TooltipTriggerProps } from "./tooltip/trigger.astro";
