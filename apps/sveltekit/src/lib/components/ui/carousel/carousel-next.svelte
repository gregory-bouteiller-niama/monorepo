<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import { Button, type ButtonProps } from "@niama/ui/svelte/button";
  import { CAROUSEL, getCarouselContext } from "./context";

  let { children, class: className, size = "icon-sm", variant = "outline", ...restProps }: ButtonProps = $props();

  const carousel = getCarouselContext();
  const canScrollNext = carousel.canScrollNext;
</script>

<Button
  class={cn(CAROUSEL.next, className)}
  data-orientation={carousel.orientation()}
  data-slot="carousel-next"
  disabled={!$canScrollNext}
  onclick={carousel.scrollNext}
  {size}
  {variant}
  {...restProps}
>
  {#if children}
    {@render children()}
  {:else}
    <span class="icon-[tabler--chevron-right]"></span>
    <span class="sr-only">Next slide</span>
  {/if}
</Button>
