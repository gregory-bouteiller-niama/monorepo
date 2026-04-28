import { createStore } from "@tanstack/store";
import { cva } from "class-variance-authority";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import type { AutoplayType } from "embla-carousel-autoplay";

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
export const CLONE_ATTR = "data-carousel-clone";
export const CLONE_ATTRS = { "aria-hidden": true, inert: true, [CLONE_ATTR]: "" } as const;

// HELPERS ---------------------------------------------------------------------------------------------------------------------------------
export const getOriginalSlideNodes = <T extends Element>(nodes: T[]) => nodes.filter((node) => !node.hasAttribute(CLONE_ATTR));
const getOffset = (axis: EmblaOptionsType["axis"], el: HTMLElement) => (axis === "y" ? el.offsetTop : el.offsetLeft);
const getSize = (axis: EmblaOptionsType["axis"], el: HTMLElement) => (axis === "y" ? el.offsetHeight : el.offsetWidth);

// STORE -----------------------------------------------------------------------------------------------------------------------------------
export const createCarouselStore = (opts: EmblaOptionsType = {}, plugins: EmblaPluginType[] = []) => {
  const store = createStore<CarouselState, CarouselActions>(
    { api: undefined, canGoToNext: false, canGoToPrev: false, opts, plugins, shouldDuplicateSlides: false },
    ({ get, setState }) => {
      const syncControls = (api: EmblaCarouselType) => {
        setState((prev) => ({ ...prev, api, canGoToNext: api.canGoToNext(), canGoToPrev: api.canGoToPrev() }));
      };

      const syncLayout = (api: EmblaCarouselType) => {
        const { opts } = get();
        const { axis = "x" } = opts;
        const rootNode = api.rootNode();
        const slides = api.slideNodes().filter((slideNode) => !slideNode.hasAttribute(CLONE_ATTR));
        const first = slides[0];
        const last = slides.at(-1);
        const viewportSize = getSize(axis, rootNode);
        const firstSlideStart = first ? getOffset(axis, first) : 0;
        const lastSlideStart = last ? getOffset(axis, last) : 0;
        const lastSlideEnd = last ? lastSlideStart + getSize(axis, last) : 0;
        const allSlidesShown = firstSlideStart >= -1 && lastSlideEnd <= viewportSize + 1;
        const shouldDuplicateSlides = slides.length > 1 && !allSlidesShown && lastSlideStart < viewportSize - 1;

        setState(({ opts, plugins }) => ({
          api,
          canGoToNext: api.canGoToNext(),
          canGoToPrev: api.canGoToPrev(),
          plugins,
          opts: { ...opts, ...(allSlidesShown ? ALL_SLIDES_SHOWN_OPTS : DEFAULT_OPTS) },
          shouldDuplicateSlides,
        }));
      };

      const bindApi = (api: EmblaCarouselType) => {
        syncControls(api);
        syncLayout(api);
        api.on("select", syncControls);
        api.on("resize", syncLayout);
        api.on("reinit", syncLayout);

        return () => {
          api.off("select", syncControls);
          api.off("resize", syncLayout);
          api.off("reinit", syncLayout);
          setState((prev) =>
            prev.api === api ? { ...prev, api: undefined, canGoToNext: false, canGoToPrev: false, shouldDuplicateSlides: false } : prev
          );
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

  store.subscribe(() => {
    const { api, canGoToNext } = store.state;
    const autoplay: AutoplayType | undefined = api?.plugins().autoplay;
    if (canGoToNext) autoplay?.play();
    else autoplay?.stop();
  });

  return store;
};
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
  shouldDuplicateSlides: boolean;
};
