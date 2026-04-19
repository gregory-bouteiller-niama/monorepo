<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import { Button, type ButtonProps } from "@niama/ui/svelte/button";
  import { CAROUSEL, getCarouselContext } from "./context";

  let { children, class: className, size = "icon-sm", variant = "outline", ...restProps }: ButtonProps = $props();

  const carousel = getCarouselContext();
  const canScrollPrev = carousel.canScrollPrev;
</script>

<Button
  class={cn(CAROUSEL.previous, className)}
  data-orientation={carousel.orientation()}
  data-slot="carousel-previous"
  disabled={!$canScrollPrev}
  onclick={carousel.scrollPrev}
  {size}
  {variant}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <span class="icon-[tabler--chevron-left]"></span>
    <span class="sr-only">Previous slide</span>
  {/if}
</Button>
