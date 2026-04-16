/** biome-ignore-all lint/performance/noBarrelFile: folder index is the public Astro component API and now owns the local styles. */
import { cva, type VariantProps } from "class-variance-authority";
import SeparatorComponent from "./Separator.astro";

export const separator = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type SeparatorStyles = VariantProps<typeof separator>;

const SeparatorVariants = { separator };

export { default as Separator } from "./Separator.astro";
export { SeparatorVariants };

export default {
  get Root() {
    return SeparatorComponent;
  },
};
