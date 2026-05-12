import type { CarouselStore } from "@niama/ui/carousel";
import { createContext } from "svelte";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
export const [getCarouselCtx, setCarouselCtx] = createContext<CarouselStore>();
export const [getRequiredCarouselCloneCtx, setCarouselCloneCtx] = createContext<boolean>();

export function getCarouselCloneCtx() {
  try {
    return getRequiredCarouselCloneCtx();
  } catch {
    return false;
  }
}
