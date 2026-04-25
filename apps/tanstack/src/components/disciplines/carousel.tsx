import type { Disciplines } from "@niama/domain/functions/disciplines";
import { cn } from "@niama/ui/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui/react/carousel";
import { Item, ItemContent, ItemDescription, ItemMedia, type ItemProps, ItemTitle } from "@niama/ui/react/item";
import { Logo } from "@niama/ui/react/logo";
import { AUTOPLAY, DISCIPLINE, DISCIPLINES } from "@niama/ui/shared/disciplines/carousel";
import { GLOW } from "@niama/ui/shared/glow";
import Autoplay from "embla-carousel-autoplay";
import Ssr from "embla-carousel-ssr";
import { useGlow } from "../use-glow";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function DisciplinesCarousel({ items }: DisciplinesCarouselProps) {
  return (
    <section className={DISCIPLINES.base()}>
      <Carousel className={DISCIPLINES.carousel()} opts={{ loop: true }} plugins={[Autoplay({ delay: AUTOPLAY }), Ssr()]}>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem className={DISCIPLINES.item()} key={item.slug}>
              <DisciplineItem item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <aside className={DISCIPLINES.controls()}>
          <CarouselPrevious className={DISCIPLINES.control()} />
          <CarouselNext className={DISCIPLINES.control()} />
        </aside>
      </Carousel>
    </section>
  );
}
export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function DisciplineItem({ className, item, ...r }: DisciplineItemProps) {
  const { props, ref } = useGlow();

  return (
    <Item className={cn(DISCIPLINE.base(), GLOW(), className)} data-discipline={item.slug} ref={ref} variant="outline" {...r} {...props}>
      <ItemMedia className={DISCIPLINE.media()}>
        <Logo className={DISCIPLINE.logo()} discipline={item} />
      </ItemMedia>
      <ItemContent className={DISCIPLINE.content()}>
        <ItemTitle className={DISCIPLINE.title()}>{item.title}</ItemTitle>
        {item.description.map((sentence) => (
          <ItemDescription className={DISCIPLINE.description()} key={sentence}>
            {sentence}
          </ItemDescription>
        ))}
      </ItemContent>
    </Item>
  );
}
type DisciplineItemProps = ItemProps & { item: Disciplines["Entity"] };
