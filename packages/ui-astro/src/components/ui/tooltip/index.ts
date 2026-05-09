/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { default as TooltipContent, type Props as TooltipContentProps } from "./content.astro";
export { TOOLTIP } from "./styles";
export { default as Tooltip, type Props as TooltipProps } from "./tooltip.astro";
export { default as TooltipTrigger, type Props as TooltipTriggerProps } from "./trigger.astro";
