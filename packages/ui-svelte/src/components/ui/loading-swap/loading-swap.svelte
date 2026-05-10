<script lang="ts" module>
  import type { LoadingSwapStyles } from "@niama/ui/loading-swap";
  import type { HTMLAttributes } from "svelte/elements";

  export type LoadingSwapProps = Pick<HTMLAttributes<HTMLDivElement>, "children" | "class"> & LoadingSwapStyles;
</script>

<script lang="ts">
  import { LOADING_SWAP } from "@niama/ui/loading-swap";
  import { cn } from "@niama/ui-svelte/lib/utils";

  let { isLoading, children, class: className }: LoadingSwapProps = $props();
</script>

<div class={LOADING_SWAP.base()}>
  <div class={cn(LOADING_SWAP.children({ isLoading }), className)}>{@render children?.()}</div>
  <div class={cn(LOADING_SWAP.loader({ isLoading }), className)}>
    <span class={LOADING_SWAP.spinner()}></span>
  </div>
</div>
