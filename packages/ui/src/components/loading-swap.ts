import { cva, type VariantProps } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const LOADING_SWAP = {
  base: cva("grid grid-cols-1 items-center justify-items-center"),
  children: cva("col-start-1 col-end-2 row-start-1 row-end-2 w-full", {
    variants: {
      isLoading: {
        false: "visible",
        true: "invisible",
      },
    },
    defaultVariants: {
      isLoading: false,
    },
  }),
  loader: cva("col-start-1 col-end-2 row-start-1 row-end-2", {
    variants: {
      isLoading: {
        false: "invisible",
        true: "visible",
      },
    },
    defaultVariants: {
      isLoading: false,
    },
  }),
  spinner: cva("icon-[lucide--loader-circle] animate-spin"),
} as const;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type LoadingSwapStyles = VariantProps<typeof LOADING_SWAP.children>;
