import { tv, type VariantProps } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	slots: {
		base: "relative size-full",
		canvas: "size-full",
		orbit: "absolute animate-spin rounded-full border border-foreground/5",
		orbits: `pointer-events-none fixed top-1/2 left-1/2 -z-10 flex size-svw min-h-[1000px] min-w-[1000px] -translate-x-1/2 -translate-y-1/2 
    items-center justify-center`,
		planet: `absolute top-0 left-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full 
    dark:bg-white`,
		stars: "absolute inset-0 size-full",
	},
	variants: {
		variant: {
			first: {
				orbit: "animation-duration-[60s] size-1/3",
				planet: "bg-yogart shadow-[0_0_10px_2px_var(--yogart)]",
			},
			second: {
				orbit: "animation-duration-[120s] direction-reverse size-2/3",
				planet: "bg-anima shadow-[0_0_10px_2px_var(--anima)]",
			},
			third: {
				orbit: "animation-duration-[180s] size-11/12",
				planet: "bg-animus shadow-[0_0_10px_2px_var(--animus)]",
			},
		},
	},
});
export const SKY = STYLES();

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type SkyStyles = VariantProps<typeof STYLES>;
