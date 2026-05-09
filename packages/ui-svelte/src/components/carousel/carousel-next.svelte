<script lang="ts">
  import { CAROUSEL } from "@niama/ui/carousel";
  import { cn } from "@niama/ui/lib/utils";
  import { IconChevronRight } from "@tabler/icons-svelte";
  import { useSelector as readStore } from "@tanstack/svelte-store";
  import type { WithoutChildren } from "bits-ui";
  import { Button, type ButtonProps } from "../button";
  import { getEmblaContext } from "./context";

  let {
    ref = $bindable(null),
    class: className,
    variant = "outline",
    size = "icon-sm",
    ...restProps
  }: WithoutChildren<ButtonProps> = $props();

  const { store: carouselStore } = getEmblaContext("<Carousel.Next/>");
  const canGoToNext = readStore(carouselStore, (state) => state.canGoToNext);
  const api = readStore(carouselStore, (state) => state.api);
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
  <IconChevronRight />
  <span class="sr-only">Next slide</span>
</Button>
