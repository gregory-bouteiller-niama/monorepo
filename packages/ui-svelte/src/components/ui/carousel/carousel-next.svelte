<script lang="ts" module>
  import type { ButtonProps } from "@niama/ui-svelte/ui/button";
  import type { WithoutChildren } from "bits-ui";

  export type CarouselNextProps = WithoutChildren<ButtonProps>;
</script>

<script lang="ts">
  import { CAROUSEL } from "@niama/ui/carousel";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Button } from "@niama/ui-svelte/ui/button";
  import { useSelector } from "@tanstack/svelte-store";
  import { getEmblaContext } from "./context";

  let { ref = $bindable(null), class: className, variant = "outline", size = "icon-sm", ...restProps }: CarouselNextProps = $props();

  const { store: carouselStore } = getEmblaContext();
  const canGoToNext = useSelector(carouselStore, (state) => state.canGoToNext);
  const api = useSelector(carouselStore, (state) => state.api);
</script>

<Button
  data-slot="carousel-next"
  {variant}
  {size}
  class={cn(CAROUSEL.next(), className)}
  disabled={!canGoToNext.current}
  onclick={() => api.current?.goToNext()}
  bind:ref
  {...restProps}
>
  <span class="icon-[tabler--chevron-right]"></span>
  <span class="sr-only">Suivant</span>
</Button>
