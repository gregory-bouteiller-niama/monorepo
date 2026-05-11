import type { CarouselActions, CarouselState, createCarouselStore } from "@niama/ui/carousel";
import type { Store } from "@tanstack/store";
import { getContext, hasContext, setContext } from "svelte";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const CTX = Symbol("CAROUSEL_CTX");

export function getCarouselContext() {
  if (!hasContext(CTX)) throw new Error("Must be used within a <Carousel> component");
  return getContext<CarouselContextProps>(CTX);
}

export function setCarouselContext(config: CarouselContextProps): CarouselContextProps {
  setContext(CTX, config);
  return config;
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type EmblaCarouselConfig = Parameters<typeof createCarouselStore>[0];

export type CarouselOptions = EmblaCarouselConfig;
export type CarouselPlugins = Parameters<typeof createCarouselStore>[1];
export type CarouselStore = ReturnType<typeof createCarouselStore>;

export type CarouselContextProps = {
  store: Store<CarouselState, CarouselActions>;
};
