/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { SEPARATOR, type SeparatorStyles } from "./separator/styles";

export { default as Separator, type Props as SeparatorProps } from "./separator/separator.astro";
