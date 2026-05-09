import { createStore } from "@tanstack/store";
import { cva } from "class-variance-authority";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import type { AutoplayType } from "embla-carousel-autoplay";
import { bindReducedMotion, prefersReducedMotion } from "./motion";

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
export const CLONE_ATTR = "data-carousel-clone";
export const CLONE_ATTRS = { "aria-hidden": true, [CLONE_ATTR]: "" } as const;
export const FOCUSABLE_SELECTOR = "a, button, input, select, textarea, [tabindex]";

const RUNTIME_STATE = { allSlidesClipped: false, api: undefined, canGoToNext: false, canGoToPrev: false };
const TOLERANCE = 1;

// HELPERS ---------------------------------------------------------------------------------------------------------------------------------
export const getOriginalSlideNodes = <T extends Element>(nodes: T[]) => nodes.filter((node) => !node.hasAttribute(CLONE_ATTR));

const getControls = (api: EmblaCarouselType) => ({ api, canGoToNext: api.canGoToNext(), canGoToPrev: api.canGoToPrev() });

const getLayout = (api: EmblaCarouselType, opts: EmblaOptionsType) => {
  const { axis = "x" } = opts;
  const slides = getOriginalSlideNodes(api.slideNodes());
  const viewportSize = getSize(axis, api.rootNode());
  const lastStart = getOffset(axis, slides.at(-1)) - getOffset(axis, slides.at(0));
  const allSlidesVisible = lastStart + getSize(axis, slides.at(-1)) <= viewportSize + TOLERANCE;
  const allSlidesClipped = slides.length > 1 && !allSlidesVisible && lastStart < viewportSize - TOLERANCE;

  let nextOpts: Partial<EmblaOptionsType> = { containScroll: "trimSnaps", slidesToScroll: 1 };
  if (allSlidesVisible) nextOpts = { containScroll: false, loop: false, slidesToScroll: "auto" };
  if (allSlidesClipped) nextOpts = { containScroll: false, loop: true, slidesToScroll: 1 };
  return { allSlidesClipped, opts: { ...opts, ...nextOpts } };
};

const getOffset = (axis: EmblaOptionsType["axis"], el: HTMLElement | undefined) => {
  if (!el) return 0;
  return axis === "y" ? el.offsetTop : el.offsetLeft;
};

const getSize = (axis: EmblaOptionsType["axis"], el: HTMLElement | undefined) => {
  if (!el) return 0;
  return axis === "y" ? el.offsetHeight : el.offsetWidth;
};

// STORE -----------------------------------------------------------------------------------------------------------------------------------
export const createCarouselStore = (opts: EmblaOptionsType = {}, plugins: EmblaPluginType[] = []) => {
  const store = createStore<CarouselState, CarouselActions>({ ...RUNTIME_STATE, opts, plugins }, ({ get, setState }) => {
    const syncState = (api: EmblaCarouselType, withLayout = false) =>
      setState((prev) => ({ ...prev, ...getControls(api), ...(withLayout ? getLayout(api, get().opts) : {}) }));

    const syncAutoplay = () => {
      const { api, canGoToNext } = get();
      const autoplay: AutoplayType | undefined = api?.plugins().autoplay;
      if (prefersReducedMotion() || !canGoToNext) autoplay?.stop();
      else autoplay?.play();
    };

    const syncControls = (api: EmblaCarouselType) => syncState(api);
    const syncLayout = (api: EmblaCarouselType) => syncState(api, true);

    const bindApi = (api: EmblaCarouselType) => {
      const { unsubscribe } = store.subscribe(syncAutoplay);
      const unbindReducedMotion = bindReducedMotion(syncAutoplay);

      syncLayout(api);
      api.on("select", syncControls);
      api.on("resize", syncLayout);
      api.on("reinit", syncLayout);

      return () => {
        unsubscribe();
        api.off("select", syncControls);
        api.off("resize", syncLayout);
        api.off("reinit", syncLayout);
        unbindReducedMotion();
        setState((prev) => ({ ...prev, ...RUNTIME_STATE }));
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
  });

  return store;
};
// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type CarouselActions = {
  bindApi: (api: EmblaCarouselType) => () => void;
  handleKeydown: (event: Pick<KeyboardEvent, "key" | "preventDefault">) => void;
};

export type CarouselState = {
  allSlidesClipped: boolean;
  api: EmblaCarouselType | undefined;
  canGoToNext: boolean;
  canGoToPrev: boolean;
  opts: EmblaOptionsType;
  plugins: EmblaPluginType[];
};
