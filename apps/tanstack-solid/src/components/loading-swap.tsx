import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@niama/ui/lib/utils";
import type { JSX } from "solid-js";

const LOADING_SWAP = {
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

export function LoadingSwap(props: LoadingSwapProps) {
  const { class: className, children, isLoading } = props;
  return (
    <div class={LOADING_SWAP.base()}>
      <div class={cn(LOADING_SWAP.children({ isLoading }), className)}>{children}</div>
      <div class={cn(LOADING_SWAP.loader({ isLoading }), className)}>
        <span class={LOADING_SWAP.spinner()} />
      </div>
    </div>
  );
}

export type LoadingSwapProps = {
  children?: JSX.Element;
} &
  VariantProps<typeof LOADING_SWAP.children> & {
    class?: string;
  };
