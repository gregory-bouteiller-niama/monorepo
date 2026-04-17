import type { Disciplines } from "@niama/domain/functions/disciplines";
import { cn } from "@niama/ui/lib/utils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui/react/carousel";
import { Item, ItemContent, ItemDescription, ItemMedia, type ItemProps, ItemTitle } from "@niama/ui/react/item";
import { Logo } from "@niama/ui/react/logo";
import { DISCIPLINES_CAROUSEL } from "@niama/ui/shared/disciplines/carousel";
import { GLOW } from "@niama/ui/shared/glow";
import Autoplay from "embla-carousel-autoplay";
import { useGlow } from "../use-glow";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function DisciplinesCarousel({ items }: DisciplinesCarouselProps) {
  return (
    <div className={DISCIPLINES_CAROUSEL.base()}>
      <Carousel className={DISCIPLINES_CAROUSEL.carousel()} opts={{ loop: true }} plugins={[Autoplay({ delay: 10_000 })]}>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem className={DISCIPLINES_CAROUSEL.carouselItem()} key={item.slug}>
              <DisciplineGlowItem className={DISCIPLINES_CAROUSEL.item()} discipline={item} variant="outline">
                <ItemMedia className={DISCIPLINES_CAROUSEL.itemMedia()}>
                  <Logo className={DISCIPLINES_CAROUSEL.logo()} discipline={item} />
                </ItemMedia>
                <ItemContent className={DISCIPLINES_CAROUSEL.itemContent()}>
                  <ItemTitle className={DISCIPLINES_CAROUSEL.itemTitle()}>{item.title}</ItemTitle>
                  {item.description.map((sentence) => (
                    <ItemDescription className={DISCIPLINES_CAROUSEL.itemDescription()} key={sentence}>
                      {sentence}
                    </ItemDescription>
                  ))}
                </ItemContent>
              </DisciplineGlowItem>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={DISCIPLINES_CAROUSEL.carouselControl()} />
        <CarouselNext className={DISCIPLINES_CAROUSEL.carouselControl()} />
        <aside className={DISCIPLINES_CAROUSEL.mobileControls()}>
          <CarouselPrevious className={DISCIPLINES_CAROUSEL.mobileControl()} />
          <CarouselNext className={DISCIPLINES_CAROUSEL.mobileControl()} />
        </aside>
      </Carousel>
    </div>
  );
}
export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };

function DisciplineGlowItem({ children, className, discipline, ...r }: DisciplineGlowItemProps) {
  const { props, ref } = useGlow();

  return (
    <Item className={cn(GLOW(), className)} data-discipline={discipline.slug} ref={ref} {...r} {...props}>
      {children}
    </Item>
  );
}
type DisciplineGlowItemProps = ItemProps & { discipline: Disciplines["Entity"] };
