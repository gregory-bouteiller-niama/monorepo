<script lang="ts" module>
  import type { WithElementRef } from "@niama/ui/lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  export type CarouselContentProps = WithElementRef<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
  import { cn } from "@niama/ui/lib/utils";
  import carousel from "embla-carousel-svelte";
  import { getEmblaContext } from "./context";

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  let { ref = $bindable(null), class: className, children, ...restProps }: CarouselContentProps = $props();

  // DATA ----------------------------------------------------------------------------------------------------------------------------------
  let opts = { container: "[data-embla-container]", slides: "[data-embla-slide]" };

  // CONTEXT -------------------------------------------------------------------------------------------------------------------------------
  const emblaCtx = getEmblaContext("<Carousel.Content/>");
</script>

<div
  data-slot="carousel-content"
  class="overflow-hidden"
  use:carousel={{
		options: {
			...opts,
			...emblaCtx.options,
			axis: emblaCtx.orientation === "horizontal" ? "x" : "y",
		},
		plugins: emblaCtx.plugins,
	}}
  on:emblainit={emblaCtx.onInit}
>
  <div
    bind:this={ref}
    class={cn(
			"flex",
			emblaCtx.orientation === "horizontal" ? "-ms-4" : "-mt-4 flex-col",
			className
		)}
    data-embla-container=""
    {...restProps}
  >
    {@render children?.()}
  </div>
</div>
