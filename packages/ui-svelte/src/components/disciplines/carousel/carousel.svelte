<script lang="ts">
  import type { Disciplines } from "@niama/domain/functions/disciplines";
  import { createCarouselStore } from "@niama/ui/carousel";
  import { AUTOPLAY, DISCIPLINE, DISCIPLINES } from "@niama/ui/disciplines/carousel";
  import { GLOW } from "@niama/ui/glow";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Card } from "@niama/ui-svelte/ui/card";
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-svelte/ui/carousel";
  import { Logo } from "@niama/ui-svelte/ui/logo";
  import Autoplay from "embla-carousel-autoplay";
  import Ssr from "embla-carousel-ssr";

  let { items }: { items: Disciplines["Entity"][] } = $props();

  const store = createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]);
</script>

<section class={DISCIPLINES.base()}>
  <Carousel class={DISCIPLINES.carousel()} {store}>
    <CarouselContent>
      {#each items as item (item.slug)}
        <CarouselItem class={DISCIPLINES.item()}>
          <Card class={cn(GLOW(), DISCIPLINE.base())} data-discipline={item.slug} data-glow>
            <div class={DISCIPLINE.media()}><Logo class={DISCIPLINE.logo()} discipline={item} /></div>
            <div class={DISCIPLINE.content()}>
              <h3 class={DISCIPLINE.title()}>{item.title}</h3>
              {#each item.description as sentence (sentence)}
                <p class={DISCIPLINE.description()}>{sentence}</p>
              {/each}
            </div>
          </Card>
        </CarouselItem>
      {/each}
    </CarouselContent>
    <aside class={DISCIPLINES.controls()}>
      <CarouselPrevious aria-label="Voie précédente" class={DISCIPLINES.control()} />
      <CarouselNext aria-label="Voie suivante" class={DISCIPLINES.control()} />
    </aside>
  </Carousel>
</section>
