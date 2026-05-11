import type { Attendants } from "@niama/domain/functions/attendants";
import { ATTENDANT, ATTENDANTS, AUTOPLAY, ROTATIONS } from "@niama/ui/attendants/carousel";
import { createCarouselStore } from "@niama/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, type CardProps, CardTitle } from "@niama/ui-react/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-react/ui/carousel";
import { Image } from "@unpic/react";
import Autoplay from "embla-carousel-autoplay";
import Ssr from "embla-carousel-ssr";
import { useState } from "react";
import { DisciplinesBadge } from "../disciplines/badge";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function AttendantsCarousel({ items }: AttendantsCarouselProps) {
  const [store] = useState(() => createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]));
  const [flippedName, setFlippedName] = useState<string | undefined>();

  return (
    <section className={ATTENDANTS.base()}>
      <Carousel className={ATTENDANTS.carousel()} store={store}>
        <CarouselContent viewportClassName={ATTENDANTS.viewport()}>
          {items.map((item, renderIndex) => (
            <CarouselItem className={ATTENDANTS.item()} key={item.name}>
              <AttendantItem
                index={renderIndex}
                isFlipped={flippedName === item.name}
                item={item}
                onToggle={() => {
                  setFlippedName((currentValue) => (currentValue === item.name ? undefined : item.name));
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <aside className={ATTENDANTS.controls()}>
          <CarouselPrevious aria-label="Participant précédent" className={ATTENDANTS.control()} />
          <CarouselNext aria-label="Participant suivant" className={ATTENDANTS.control()} />
        </aside>
      </Carousel>
    </section>
  );
}
export type AttendantsCarouselProps = { items: Attendants["Entity"][] };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
function AttendantItem({ index, isFlipped, item, onToggle }: AttendantItemProps) {
  return (
    <button
      aria-label={`Afficher la fiche de ${item.name}`}
      aria-pressed={isFlipped}
      className={ATTENDANT.base({ className: ROTATIONS[index % ROTATIONS.length] })}
      data-flipped={isFlipped}
      onClick={onToggle}
      type="button"
    >
      <AttendantItemCard item={item}>
        <CardContent className={ATTENDANT.image()}>
          <div className={ATTENDANT.overlay()}>
            <span className={ATTENDANT.icon()} />
          </div>
          <Image
            {...item.image}
            breakpoints={[420, 840]}
            operations={{ imagekit: { f: "avif", q: 80 } }}
            sizes="(min-width: 640px) 420px, 100vw"
          />
        </CardContent>
      </AttendantItemCard>
      <AttendantItemCard data-back item={item}>
        <CardContent className={ATTENDANT.description()}>
          {item.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CardContent>
      </AttendantItemCard>
    </button>
  );
}
type AttendantItemProps = {
  index: number;
  isFlipped: boolean;
  item: Attendants["Entity"];
  onToggle: () => void;
};

// CARD ------------------------------------------------------------------------------------------------------------------------------------
function AttendantItemCard({ children, item, ...props }: AttendantItemCardProps) {
  return (
    <Card className={ATTENDANT.card()} {...props}>
      <CardHeader>
        <CardTitle className={ATTENDANT.title()}>{item.name}</CardTitle>
        <CardDescription className={ATTENDANT.badges()}>
          {item.disciplines.map(({ slug }) => (
            <DisciplinesBadge key={slug} slug={slug} />
          ))}
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
type AttendantItemCardProps = CardProps & { item: Attendants["Entity"] };
