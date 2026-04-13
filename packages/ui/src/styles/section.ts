import { tv } from "tailwind-variants";

const STYLES = tv({
	base: "relative flex w-full flex-col items-center gap-4 pb-8",
	slots: {
		description: "mb-12 max-w-4xl text-center font-light text-lg text-muted-foreground sm:text-xl",
		separator: "self-center! h-24",
		title: "text-center font-heading text-6xl",
	},
});
export const SECTION = STYLES();
