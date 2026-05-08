<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import { CAROUSEL } from "@niama/ui/shared/carousel";
  import { IconChevronLeft } from "@tabler/icons-svelte";
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

  const { store: carouselStore } = getEmblaContext("<Carousel.Previous/>");
  const canGoToPrev = readStore(carouselStore, (state) => state.canGoToPrev);
  const api = readStore(carouselStore, (state) => state.api);
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
  <IconChevronLeft />
  <span class="sr-only">Previous slide</span>
</Button>
