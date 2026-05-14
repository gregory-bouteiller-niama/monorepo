import { LOADING_SWAP, type LoadingSwapStyles } from "@niama/ui/loading-swap";
import { cn } from "@niama/ui-solid/lib/utils";
import { type ComponentProps, splitProps } from "solid-js";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function LoadingSwap(props: LoadingSwapProps) {
  const [local, others] = splitProps(props, ["children", "class", "isLoading"]);
  return (
    <div class={LOADING_SWAP.base()} {...others}>
      <div class={cn(LOADING_SWAP.children({ isLoading: local.isLoading }), local.class)}>{local.children}</div>
      <div class={cn(LOADING_SWAP.loader({ isLoading: local.isLoading }), local.class)}>
        <span class={LOADING_SWAP.spinner()} />
      </div>
    </div>
  );
}
export type LoadingSwapProps = ComponentProps<"div"> & LoadingSwapStyles;
