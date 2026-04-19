import type { EmblaCarouselType } from "embla-carousel";

declare module "svelte/elements" {
  // biome-ignore lint/style/useConsistentTypeDefinitions: interface merging is required for module augmentation
  interface HTMLAttributes<T> {
    onemblainit?: (event: CustomEvent<EmblaCarouselType>) => void;
  }
}
