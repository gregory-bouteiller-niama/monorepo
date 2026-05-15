import type { CarouselStore } from "@niama/ui/carousel";
import { createStoreContext } from "@tanstack/solid-store";
import type { UseEmblaCarouselType } from "embla-carousel-solid";
import { createContext } from "solid-js";

// CONTEXTS --------------------------------------------------------------------------------------------------------------------------------
export const { StoreProvider: CarouselProvider, useStoreContext: useCarousel } = createStoreContext<CarouselContext>();
export type CarouselContext = { ref: UseEmblaCarouselType[0]; store: CarouselStore };

export const CarouselCloneContext = createContext(false);
