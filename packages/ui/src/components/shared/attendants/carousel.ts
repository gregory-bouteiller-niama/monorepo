import { cva } from "class-variance-authority";
import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
  slots: {
    actions: "flex w-32 justify-between self-center rounded-full border p-2",
    aside: "perspective-[1000px] relative flex aspect-square min-h-96 w-full flex-1 justify-center",
    base: "flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-20",
    description: "flex flex-col gap-1 text-pretty text-center font-light text-base",
    disciplines: "flex justify-center gap-1",
    image: "absolute size-full rounded-4xl object-cover shadow-xl transition-all duration-800 ease-[cubic-bezier(0.4,2,0.3,1)]", // this
    main: "flex flex-1 flex-col justify-between gap-4",
    name: "text-center font-bold font-heading text-3xl",
  },
  variants: {
    status: {
      current: { image: "translate-0 pointer-events-auto z-40 rotate-y-0 scale-100 opacity-100" }, // this
      next: { image: "pointer-events-auto z-30 translate-x-15 -translate-y-12 -rotate-y-15 scale-85 opacity-100" }, // this
      other: { image: "pointer-events-none z-10 opacity-0" }, // this
      prev: { image: "pointer-events-auto z-20 -translate-x-15 -translate-y-12 rotate-y-15 scale-85 opacity-100" }, // this
    },
  },
});
export const ATTENDANTS_CAROUSEL = STYLES();

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const ATTENDANTS = {
  actions: cva("flex w-32 justify-between self-center rounded-full border p-2"),
  aside: cva("perspective-[1000px] relative flex aspect-square min-h-96 w-full flex-1 justify-center"),
  badge: cva("font-normal text-sm"),
  base: cva("flex w-full max-w-6xl flex-col items-center gap-8 lg:flex-row lg:gap-20"),
  card: cva("h-full w-full lg:h-[448px] xl:h-[400px]"),
  cardPanel: cva(
    "transition-[opacity,transform] duration-300 ease-in-out data-[state=inactive]:pointer-events-none data-[state=inactive]:absolute data-[state=active]:relative data-[state=inactive]:inset-0 data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-5 data-[state=active]:opacity-100 data-[state=inactive]:opacity-0"
  ),
  description: cva("flex flex-col gap-1 text-pretty text-center font-light text-base"),
  disciplines: cva("flex justify-center gap-1"),
  image: cva("absolute size-full rounded-[2rem] object-cover shadow-xl transition-all duration-800 ease-[cubic-bezier(0.4,2,0.3,1)]"),
  imageCurrent: cva("pointer-events-auto z-40 translate-x-0 translate-y-0 rotate-y-0 scale-100 opacity-100"),
  imageNext: cva("pointer-events-auto z-30 translate-x-15 -translate-y-12 -rotate-y-15 scale-85 opacity-100"),
  imageOther: cva("pointer-events-none z-10 opacity-0"),
  imagePrev: cva("pointer-events-auto z-20 -translate-x-15 -translate-y-12 rotate-y-15 scale-85 opacity-100"),
  main: cva("flex w-full flex-1 flex-col justify-between gap-4"),
  name: cva("text-center font-bold font-heading text-3xl"),
  panelContainer: cva("relative min-h-[400px] w-full flex-1 lg:min-h-[448px] xl:min-h-[400px]"),
};
