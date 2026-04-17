/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva, type VariantProps } from "class-variance-authority";

export const SEPARATOR = {
  base: cva("shrink-0 bg-border", {
    variants: {
      orientation: {
        horizontal: "h-px w-full",
        vertical: "h-full w-px",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }),
} as const;

export type SeparatorStyles = VariantProps<typeof SEPARATOR.base>;

export { default as Separator, type Props as SeparatorProps } from "./separator/separator.astro";
