import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	base: "font-normal text-sm",
	variants: { discipline: { anima: "bg-anima", animus: "bg-animus", yogart: "bg-yogart" } },
});
export const DISCIPLINES_BADGE = STYLES;
