import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	slots: {
		actions: "flex w-32 justify-between self-center rounded-full border p-2",
		aside: "perspective-[1000px] relative flex aspect-square min-h-96 w-full flex-1 justify-center",
		base: "flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-20",
		description: "flex flex-col gap-1 text-pretty text-center font-light text-base",
		disciplines: "flex justify-center gap-1",
		image: "absolute size-full rounded-4xl object-cover shadow-xl transition-all duration-800 ease-[cubic-bezier(0.4,2,0.3,1)]",
		main: "flex flex-1 flex-col justify-between gap-4",
		name: "text-center font-bold font-heading text-3xl",
	},
	variants: {
		status: {
			current: { image: "translate-0 pointer-events-auto z-40 rotate-y-0 scale-100 opacity-100" },
			next: { image: "pointer-events-auto z-30 translate-x-15 -translate-y-12 -rotate-y-15 scale-85 opacity-100" },
			other: { image: "pointer-events-none z-10 opacity-0" },
			prev: { image: "pointer-events-auto z-20 -translate-x-15 -translate-y-12 rotate-y-15 scale-85 opacity-100" },
		},
	},
});
export const ATTENDANTS_CAROUSEL = STYLES();

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const ATTENDANTS = tv({
	slots: {
		actions: "flex w-32 justify-between self-center rounded-full border p-2",
		aside: "relative flex aspect-square min-h-96 w-full flex-1 justify-center [perspective:1000px]",
		badge: "font-normal text-sm",
		base: "flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-20",
		card: "h-full lg:h-[448px] xl:h-[400px]",
		cardPanel:
			"transition-[opacity,transform] duration-300 ease-in-out data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=active]:relative data-[state=inactive]:inset-0 data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-5 data-[state=active]:opacity-100 data-[state=inactive]:opacity-0",
		description: "flex flex-col gap-1 text-pretty text-center font-light text-base",
		disciplines: "flex justify-center gap-1",
		image: "absolute size-full rounded-[2rem] object-cover shadow-xl transition-all duration-800 ease-[cubic-bezier(0.4,2,0.3,1)]",
		imageCurrent: "pointer-events-auto z-40 translate-x-0 translate-y-0 rotate-y-0 scale-100 opacity-100",
		imageNext: "pointer-events-auto z-30 translate-x-15 -translate-y-12 -rotate-y-15 scale-85 opacity-100",
		imageOther: "pointer-events-none z-10 opacity-0",
		imagePrev: "pointer-events-auto z-20 -translate-x-15 -translate-y-12 rotate-y-15 scale-85 opacity-100",
		main: "flex flex-1 flex-col justify-between gap-4",
		name: "text-center font-bold font-heading text-3xl",
		panelContainer: "relative min-h-[400px] flex-1 lg:min-h-[448px] xl:min-h-[400px]",
	},
})();
