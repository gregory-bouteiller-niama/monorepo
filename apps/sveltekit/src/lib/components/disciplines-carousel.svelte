<script lang="ts">
  import type { Disciplines } from "@niama/domain/functions/disciplines";
  import { cn } from "@niama/ui/lib/utils";
  import { DISCIPLINES_CAROUSEL } from "@niama/ui/shared/disciplines/carousel";
  import { GLOW } from "@niama/ui/shared/glow";
  import { Button } from "@niama/ui/svelte/button";
  import { Card } from "@niama/ui/svelte/card";
  import { Logo } from "@niama/ui/svelte/logo";
  import type { EmblaCarouselType } from "embla-carousel";
  import Autoplay from "embla-carousel-autoplay";
  import useEmblaCarousel from "embla-carousel-svelte";

  let { items }: { items: Disciplines["Entity"][] } = $props();

  let emblaApi = $state<EmblaCarouselType | null>(null);

  const options = { loop: true };
  const plugins = [Autoplay({ delay: 10_000 })];
  const canControl = $derived(items.length > 1);

  const handleEmblaInit = (event: CustomEvent<EmblaCarouselType>) => {
    emblaApi = event.detail;
  };

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };
</script>

<div class={DISCIPLINES_CAROUSEL.base()}>
  <div class={DISCIPLINES_CAROUSEL.carousel()}>
    <div class="overflow-hidden" onemblainit={handleEmblaInit} use:useEmblaCarousel={{ options, plugins }}>
      <div class="flex touch-pan-y pinch-zoom">
        {#each items as item (item.slug)}
          <div class={cn("min-w-0 shrink-0 grow-0 basis-full", DISCIPLINES_CAROUSEL.carouselItem())}>
            <Card class={cn(GLOW(), DISCIPLINES_CAROUSEL.item())} data-discipline={item.slug} data-glow>
              <div class={DISCIPLINES_CAROUSEL.itemMedia()}><Logo class={DISCIPLINES_CAROUSEL.logo()} discipline={item} /></div>
              <div class={DISCIPLINES_CAROUSEL.itemContent()}>
                <h3 class={DISCIPLINES_CAROUSEL.itemTitle()}>{item.title}</h3>
                {#each item.description as sentence (sentence)}
                  <p class={DISCIPLINES_CAROUSEL.itemDescription()}>{sentence}</p>
                {/each}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </div>
    <aside class={DISCIPLINES_CAROUSEL.controls()}>
      <Button
        aria-label="Voie précédente"
        class={DISCIPLINES_CAROUSEL.control()}
        disabled={!canControl}
        onclick={scrollPrev}
        size="icon-sm"
        variant="outline"
      >
        <span class="icon-[lucide--chevron-left]"></span>
      </Button>
      <Button
        aria-label="Voie suivante"
        class={DISCIPLINES_CAROUSEL.control()}
        disabled={!canControl}
        onclick={scrollNext}
        size="icon-sm"
        variant="outline"
      >
        <span class="icon-[lucide--chevron-right]"></span>
      </Button>
    </aside>
  </div>
</div>
