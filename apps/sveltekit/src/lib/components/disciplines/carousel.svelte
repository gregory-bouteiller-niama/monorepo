<script lang="ts">
  import type { Disciplines } from "@niama/domain/functions/disciplines";
  import { cn } from "@niama/ui/lib/utils";
  import { DISCIPLINE, DISCIPLINES } from "@niama/ui/shared/disciplines/carousel";
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

<div class={DISCIPLINES.base()}>
  <div class={DISCIPLINES.carousel()}>
    <div class="overflow-hidden" onemblainit={handleEmblaInit} use:useEmblaCarousel={{ options, plugins }}>
      <div class="flex touch-pan-y pinch-zoom">
        {#each items as item (item.slug)}
          <div class={cn("min-w-0 shrink-0 grow-0 basis-full", DISCIPLINES.item())}>
            <Card class={cn(GLOW(), DISCIPLINE.base())} data-discipline={item.slug} data-glow>
              <div class={DISCIPLINE.media()}><Logo class={DISCIPLINE.logo()} discipline={item} /></div>
              <div class={DISCIPLINE.content()}>
                <h3 class={DISCIPLINE.title()}>{item.title}</h3>
                {#each item.description as sentence (sentence)}
                  <p class={DISCIPLINE.description()}>{sentence}</p>
                {/each}
              </div>
            </Card>
          </div>
        {/each}
      </div>
    </div>
    <aside class={DISCIPLINES.controls()}>
      <Button
        aria-label="Voie précédente"
        class={DISCIPLINES.control()}
        disabled={!canControl}
        onclick={scrollPrev}
        size="icon-sm"
        variant="outline"
      >
        <span class="icon-[lucide--chevron-left]"></span>
      </Button>
      <Button
        aria-label="Voie suivante"
        class={DISCIPLINES.control()}
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
