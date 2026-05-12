<script lang="ts" module>
  import { CAROUSEL } from "@niama/ui/carousel";
  import { useSelector } from "@niama/ui-svelte/lib/store.svelte";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Button, type ButtonProps } from "@niama/ui-svelte/ui/button";
  import type { WithoutChildren } from "bits-ui";
  import { getCarouselCtx } from "./context";

  export type CarouselNextProps = WithoutChildren<ButtonProps>;
</script>

<script lang="ts">
  let { ref = $bindable(null), class: className, variant = "outline", size = "icon-sm", ...restProps }: CarouselNextProps = $props();

  const store = getCarouselCtx();
  const canGoToNext = useSelector(store, (state) => state.canGoToNext);
  const api = useSelector(store, (state) => state.api);
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
