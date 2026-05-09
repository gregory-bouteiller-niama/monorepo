import type { CarouselActions, CarouselState, createCarouselStore } from "@niama/ui/carousel";
import type { WithElementRef } from "@niama/ui/lib/utils";
import type { Store } from "@tanstack/store";
import { getContext, hasContext, setContext } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const CTX = Symbol("CAROUSEL_CTX");

export function getEmblaContext(name = "This component") {
  if (!hasContext(CTX)) throw new Error(`${name} must be used within a <Carousel.Root> component`);
  return getContext<CarouselContextProps>(CTX);
}

export function setEmblaContext(config: CarouselContextProps): CarouselContextProps {
  setContext(CTX, config);
  return config;
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type EmblaCarouselConfig = Parameters<typeof createCarouselStore>[0];

export type CarouselOptions = EmblaCarouselConfig;
export type CarouselPlugins = Parameters<typeof createCarouselStore>[1];
export type CarouselStore = ReturnType<typeof createCarouselStore>;

export type CarouselProps = {
  store?: CarouselStore;
  opts?: CarouselOptions;
  plugins?: CarouselPlugins;
} & WithElementRef<HTMLAttributes<HTMLElement>>;

export type CarouselContextProps = {
  store: Store<CarouselState, CarouselActions>;
};
