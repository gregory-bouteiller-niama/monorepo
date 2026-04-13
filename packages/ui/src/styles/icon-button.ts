import { tv, type VariantProps } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
  base: "",
  slots: {
    icon: "size-5",
  },
  variants: {
    loading: {
      false: {
        base: "cursor-pointer",
        icon: "",
      },
      true: {
        base: "cursor-wait",
        icon: "icon-[lucide--loader2] animate-pulse",
      },
    },
  },
  defaultVariants: {
    loading: false,
  },
});
export const ICON_BUTTON = STYLES();

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type IconButtonStyles = VariantProps<typeof STYLES>;
