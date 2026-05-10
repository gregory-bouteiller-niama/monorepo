<script lang="ts" module>
  import type { ButtonProps } from "@niama/ui-svelte/ui/button";
  import type { WithoutChildren } from "bits-ui";

  export type CarouselPreviousProps = WithoutChildren<ButtonProps>;
</script>

<script lang="ts">
  import { CAROUSEL } from "@niama/ui/carousel";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Button } from "@niama/ui-svelte/ui/button";
  import { useSelector } from "@tanstack/svelte-store";
  import { getEmblaContext } from "./context";

  let { ref = $bindable(null), class: className, variant = "outline", size = "icon-sm", ...restProps }: CarouselPreviousProps = $props();

  const { store: carouselStore } = getEmblaContext();
  const canGoToPrev = useSelector(carouselStore, (state) => state.canGoToPrev);
  const api = useSelector(carouselStore, (state) => state.api);
</script>

<Button
  data-slot="carousel-previous"
  {variant}
  {size}
  class={cn(CAROUSEL.previous(), className)}
  disabled={!canGoToPrev.current}
  onclick={() => api.current?.goToPrev()}
  bind:ref
  {...restProps}
>
  <span class="icon-[tabler--chevron-left]"></span>
  <span class="sr-only">Précédent</span>
</Button>
