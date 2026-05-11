<script lang="ts" module>
  import type { Disciplines } from "@niama/domain/functions/disciplines";
  import { createCarouselStore } from "@niama/ui/carousel";
  import { AUTOPLAY, DISCIPLINES } from "@niama/ui/disciplines/carousel";
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-svelte/ui/carousel";
  import Autoplay from "embla-carousel-autoplay";
  import Ssr from "embla-carousel-ssr";
  import DisciplinesItem from "./carousel.item.svelte";

  export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };
</script>

<script lang="ts">
  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  let { items }: DisciplinesCarouselProps = $props();

  // STORE ---------------------------------------------------------------------------------------------------------------------------------
  const store = createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]);
</script>

<section class={DISCIPLINES.base()}>
  <Carousel class={DISCIPLINES.carousel()} {store}>
    <CarouselContent>
      {#each items as item (item.slug)}
        <CarouselItem class={DISCIPLINES.item()}>
          <DisciplinesItem {item} />
        </CarouselItem>
      {/each}
    </CarouselContent>
    <aside class={DISCIPLINES.controls()}>
      <CarouselPrevious aria-label="Voie précédente" class={DISCIPLINES.control()} />
      <CarouselNext aria-label="Voie suivante" class={DISCIPLINES.control()} />
    </aside>
  </Carousel>
</section>
