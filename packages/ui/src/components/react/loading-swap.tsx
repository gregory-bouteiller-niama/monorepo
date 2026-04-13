import { tv, type VariantProps } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	slots: {
		base: "grid grid-cols-1 items-center justify-items-center",
		children: "col-start-1 col-end-2 row-start-1 row-end-2 w-full",
		loader: "col-start-1 col-end-2 row-start-1 row-end-2",
		spinner: "icon-[lucide--loader-circle] animate-spin",
	},
	variants: {
		isLoading: {
			false: {
				children: "visible",
				loader: "invisible",
			},
			true: {
				children: "invisible",
				loader: "visible",
			},
		},
	},
	defaultVariants: {
		isLoading: false,
	},
});

export const LOADING_SWAP = STYLES();

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function LoadingSwap({ isLoading, children, className }: LoadingSwapProps) {
	return (
		<div className={LOADING_SWAP.base()}>
			<div className={LOADING_SWAP.children({ className, isLoading })}>{children}</div>
			<div className={LOADING_SWAP.loader({ className, isLoading })}>
				<span className={LOADING_SWAP.spinner()} />
			</div>
		</div>
	);
}
export type LoadingSwapProps = React.PropsWithChildren & { className?: string } & LoadingSwapStyles;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type LoadingSwapStyles = VariantProps<typeof STYLES>;
