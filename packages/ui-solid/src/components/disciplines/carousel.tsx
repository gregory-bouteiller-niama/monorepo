import type { Disciplines } from "@niama/domain/functions/disciplines";
import { createCarouselStore } from "@niama/ui/carousel";
import { AUTOPLAY, DISCIPLINE, DISCIPLINES } from "@niama/ui/disciplines/carousel";
import { GLOW } from "@niama/ui/glow";
import { cn } from "@niama/ui-solid/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-solid/ui/carousel";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@niama/ui-solid/ui/item";
import { Logo } from "@niama/ui-solid/ui/logo";
import Autoplay from "embla-carousel-autoplay";
import Ssr from "embla-carousel-ssr";
import { For, splitProps } from "solid-js";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function DisciplinesCarousel(props: DisciplinesCarouselProps) {
  const store = createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]);

  return (
    <section class={DISCIPLINES.base()}>
      <Carousel class={DISCIPLINES.carousel()} store={store}>
        <CarouselContent>
          <For each={props.items}>
            {(item) => (
              <CarouselItem class={DISCIPLINES.item()}>
                <DisciplineItem item={item} />
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <aside class={DISCIPLINES.controls()}>
          <CarouselPrevious class={DISCIPLINES.control()} />
          <CarouselNext class={DISCIPLINES.control()} />
        </aside>
      </Carousel>
    </section>
  );
}
export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function DisciplineItem(props: DisciplineItemProps) {
  const [local, others] = splitProps(props, ["class", "item"]);

  return (
    <Item class={cn(DISCIPLINE.base(), GLOW(), local.class)} data-discipline={local.item.slug} variant="outline" {...others}>
      <ItemMedia class={DISCIPLINE.media()}>
        <Logo class={DISCIPLINE.logo()} discipline={local.item} />
      </ItemMedia>
      <ItemContent class={DISCIPLINE.content()}>
        <ItemTitle class={DISCIPLINE.title()}>{local.item.title}</ItemTitle>
        <For each={local.item.description}>
          {(sentence) => <ItemDescription class={DISCIPLINE.description()}>{sentence}</ItemDescription>}
        </For>
      </ItemContent>
    </Item>
  );
}
type DisciplineItemProps = { class?: string; item: Disciplines["Entity"] };
