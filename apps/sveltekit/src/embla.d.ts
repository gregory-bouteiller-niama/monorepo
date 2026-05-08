import type { EmblaCarouselType } from "embla-carousel";

declare module "svelte/elements" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: interface merging is required for module augmentation
  interface HTMLAttributes<T> {
    "on:emblainit"?: (event: CustomEvent<EmblaCarouselType>) => void;
    onemblainit?: (event: CustomEvent<EmblaCarouselType>) => void;
  }
}
