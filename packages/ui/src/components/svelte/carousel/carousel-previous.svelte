<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import { IconChevronLeft } from "@tabler/icons-svelte";
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

  const emblaCtx = getEmblaContext("<Carousel.Previous/>");
</script>

<Button
  data-slot="carousel-previous"
  {variant}
  {size}
  aria-disabled={!emblaCtx.canScrollPrev}
  disabled={!emblaCtx.canScrollPrev}
  class={cn(
    "absolute touch-manipulation rounded-full",
    emblaCtx.orientation === "horizontal"
      ? "-start-12 top-1/2 -translate-y-1/2"
      : "start-1/2 -top-12 -translate-x-1/2 rotate-90",
    className
	)}
  onclick={emblaCtx.scrollPrev}
  onkeydown={emblaCtx.handleKeyDown}
  {...restProps}
  bind:ref
>
  <IconChevronLeft />
  <span class="sr-only">Previous slide</span>
</Button>
