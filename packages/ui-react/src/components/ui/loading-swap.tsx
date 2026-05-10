import { LOADING_SWAP, type LoadingSwapStyles } from "@niama/ui/loading-swap";
import { cn } from "@niama/ui-react/lib/utils";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function LoadingSwap({ isLoading, children, className }: LoadingSwapProps) {
  return (
    <div className={LOADING_SWAP.base()}>
      <div className={cn(LOADING_SWAP.children({ isLoading }), className)}>{children}</div>
      <div className={cn(LOADING_SWAP.loader({ isLoading }), className)}>
        <span className={LOADING_SWAP.spinner()} />
      </div>
    </div>
  );
}
export type LoadingSwapProps = React.PropsWithChildren & { className?: string } & LoadingSwapStyles;
