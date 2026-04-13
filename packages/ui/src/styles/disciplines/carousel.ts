import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	base: "w-full sm:px-12",
	slots: {
		carousel: "flex w-full flex-col justify-center",
		carouselControl: "hidden cursor-pointer sm:inline-flex",
		carouselItem: "@container basis-full lg:basis-1/2 2xl:basis-1/2",
		item: "h-full @lg:flex-row flex-col gap-6 bg-card p-6",
		itemContent: "gap-1",
		itemDescription: "line-clamp-none text-pretty text-center @lg:text-start font-light text-base text-foreground",
		itemMedia: "self-center!",
		itemTitle: "mb-3 @lg:self-start self-center font-bold font-heading text-3xl",
		logo: "w-32",
		mobileControl: "translate-0 static cursor-pointer",
		mobileControls: "mt-4 flex w-32 justify-between self-center rounded-full border p-2 sm:hidden",
	},
});
export const DISCIPLINES_CAROUSEL = STYLES();
