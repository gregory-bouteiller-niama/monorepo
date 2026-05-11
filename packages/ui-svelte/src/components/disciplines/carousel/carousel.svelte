<script lang="ts" module>
  import type { Disciplines } from "@niama/domain/functions/disciplines";
  import { createCarouselStore } from "@niama/ui/carousel";
  import { AUTOPLAY, DISCIPLINE, DISCIPLINES } from "@niama/ui/disciplines/carousel";
  import { GLOW } from "@niama/ui/glow";
  import { glow } from "@niama/ui-svelte/hooks/glow";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-svelte/ui/carousel";
  import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@niama/ui-svelte/ui/item";
  import { Logo } from "@niama/ui-svelte/ui/logo";
  import Autoplay from "embla-carousel-autoplay";
  import Ssr from "embla-carousel-ssr";

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
        <CarouselItem class={DISCIPLINES.item()}> {@render disciplinesItem(item)} </CarouselItem>
      {/each}
    </CarouselContent>
    <aside class={DISCIPLINES.controls()}>
      <CarouselPrevious aria-label="Voie précédente" class={DISCIPLINES.control()} />
      <CarouselNext aria-label="Voie suivante" class={DISCIPLINES.control()} />
    </aside>
  </Carousel>
</section>

{#snippet disciplinesItem(item: Disciplines["Entity"])}
  <Item class={cn(DISCIPLINE.base(), GLOW())} data-discipline={item.slug} variant="outline" {@attach glow()}>
    <ItemMedia class={DISCIPLINE.media()}>
      <Logo class={DISCIPLINE.logo()} discipline={item} />
    </ItemMedia>
    <ItemContent class={DISCIPLINE.content()}>
      <ItemTitle class={DISCIPLINE.title()}>{item.title}</ItemTitle>
      {#each item.description as sentence (sentence)}
        <ItemDescription class={DISCIPLINE.description()}> {sentence} </ItemDescription>
      {/each}
    </ItemContent>
  </Item>
{/snippet}
