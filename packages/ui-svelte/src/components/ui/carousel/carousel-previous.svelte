<script lang="ts" module>
  import { CAROUSEL } from "@niama/ui/carousel";
  import { useSelector } from "@niama/ui-svelte/lib/store.svelte";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Button, type ButtonProps } from "@niama/ui-svelte/ui/button";
  import type { WithoutChildren } from "bits-ui";
  import { getCarouselContext } from "./context";

  export type CarouselPreviousProps = WithoutChildren<ButtonProps>;
</script>

<script lang="ts">
  let { ref = $bindable(null), class: className, variant = "outline", size = "icon-sm", ...restProps }: CarouselPreviousProps = $props();

  const { store } = getCarouselContext();
  const canGoToPrev = useSelector(store, (state) => state.canGoToPrev);
  const api = useSelector(store, (state) => state.api);
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
