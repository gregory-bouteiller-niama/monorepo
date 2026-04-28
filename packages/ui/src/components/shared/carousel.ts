import { createStore } from "@tanstack/store";
import { cva } from "class-variance-authority";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const CAROUSEL = {
  base: cva("group/carousel relative"),
  content: cva(`flex 
    group-data-[axis=y]/carousel:-mt-4 group-data-[axis=x]/carousel:-ml-4 
    group-data-[axis=y]/carousel:flex-col`),
  item: cva(`min-w-0 shrink-0 grow-0 basis-full 
    group-data-[axis=y]/carousel:pt-4 group-data-[axis=x]/carousel:pl-4`),
  next: cva(`absolute touch-manipulation rounded-full 
    group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-right-12 
    group-data-[axis=x]/carousel:-translate-y-1/2 group-data-[axis=y]/carousel:-bottom-12 
    group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 
    group-data-[axis=y]/carousel:rotate-90`),
  previous: cva(`absolute touch-manipulation rounded-full 
    group-data-[axis=x]/carousel:top-1/2 group-data-[axis=x]/carousel:-left-12 
    group-data-[axis=x]/carousel:-translate-y-1/2 group-data-[axis=y]/carousel:-top-12 
    group-data-[axis=y]/carousel:left-1/2 group-data-[axis=y]/carousel:-translate-x-1/2 
    group-data-[axis=y]/carousel:rotate-90`),
  viewport: cva("overflow-hidden"),
} as const;

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const ALL_SLIDES_SHOWN_OPTS = { containScroll: false, slidesToScroll: "auto" } as const;
const DEFAULT_OPTS = { containScroll: "trimSnaps", slidesToScroll: 1 } as const;

// STORE -----------------------------------------------------------------------------------------------------------------------------------
export const createCarouselStore = (opts: EmblaOptionsType = {}, plugins: EmblaPluginType[] = []) =>
  createStore<CarouselState, CarouselActions>(
    { api: undefined, canGoToNext: false, canGoToPrev: false, opts, plugins },
    ({ get, setState }) => {
      const syncFromApi = (api: EmblaCarouselType) => {
        const { containerRect, slideRects } = api.internalEngine();
        setState(({ opts, plugins }) => ({
          api,
          canGoToNext: api.canGoToNext(),
          canGoToPrev: api.canGoToPrev(),
          plugins,
          opts: { ...opts, ...(containerRect.right > (slideRects.at(-1)?.right ?? 0) ? ALL_SLIDES_SHOWN_OPTS : DEFAULT_OPTS) },
        }));
      };

      const bindApi = (api: EmblaCarouselType) => {
        syncFromApi(api);
        api.on("select", syncFromApi);
        api.on("reinit", syncFromApi);

        return () => {
          api.off("select", syncFromApi);
          api.off("reinit", syncFromApi);
          setState((prev) => (prev.api === api ? { ...prev, api: undefined, canGoToNext: false, canGoToPrev: false } : prev));
        };
      };

      const handleKeydown = (event: Pick<KeyboardEvent, "key" | "preventDefault">) => {
        const axis = get().opts.axis;
        const prevKey = axis === "y" ? "ArrowUp" : "ArrowLeft";
        const nextKey = axis === "y" ? "ArrowDown" : "ArrowRight";

        if (event.key === prevKey) {
          event.preventDefault();
          get().api?.goToPrev();
        } else if (event.key === nextKey) {
          event.preventDefault();
          get().api?.goToNext();
        }
      };

      return { bindApi, handleKeydown };
    }
  );

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type CarouselActions = {
  bindApi: (api: EmblaCarouselType) => () => void;
  handleKeydown: (event: Pick<KeyboardEvent, "key" | "preventDefault">) => void;
};

export type CarouselState = {
  api: EmblaCarouselType | undefined;
  canGoToNext: boolean;
  canGoToPrev: boolean;
  opts: EmblaOptionsType;
  plugins: EmblaPluginType[];
};
