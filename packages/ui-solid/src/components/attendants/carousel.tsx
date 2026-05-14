import type { Attendants } from "@niama/domain/functions/attendants";
import { ATTENDANT, ATTENDANTS, AUTOPLAY, ROTATIONS } from "@niama/ui/attendants/carousel";
import { createCarouselStore } from "@niama/ui/carousel";
import { DisciplinesBadge } from "@niama/ui-solid/disciplines/badge";
import { Card, CardContent, CardDescription, CardHeader, type CardProps, CardTitle } from "@niama/ui-solid/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@niama/ui-solid/ui/carousel";
import { Image } from "@unpic/solid";
import Autoplay from "embla-carousel-autoplay";
import Ssr from "embla-carousel-ssr";
import { createSignal, For } from "solid-js";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function AttendantsCarousel({ items }: AttendantsCarouselProps) {
  const store = createCarouselStore({ loop: true }, [Autoplay({ delay: AUTOPLAY }), Ssr()]);
  const [flippedName, setFlippedName] = createSignal<string | undefined>();

  return (
    <section class={ATTENDANTS.base()}>
      <Carousel class={ATTENDANTS.carousel()} store={store}>
        <CarouselContent viewportClass={ATTENDANTS.viewport()}>
          <For each={items}>
            {(item, index) => (
              <CarouselItem class={ATTENDANTS.item()}>
                <AttendantItem
                  index={index()}
                  isFlipped={flippedName() === item.name}
                  item={item}
                  onToggle={() => {
                    setFlippedName((currentValue) => (currentValue === item.name ? undefined : item.name));
                  }}
                />
              </CarouselItem>
            )}
          </For>
        </CarouselContent>
        <aside class={ATTENDANTS.controls()}>
          <CarouselPrevious aria-label="Participant précédent" class={ATTENDANTS.control()} />
          <CarouselNext aria-label="Participant suivant" class={ATTENDANTS.control()} />
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
      class={ATTENDANT.base({ className: ROTATIONS[index % ROTATIONS.length] })}
      data-flipped={isFlipped}
      onClick={onToggle}
      type="button"
    >
      <AttendantItemCard item={item}>
        <CardContent class={ATTENDANT.image()}>
          <div class={ATTENDANT.overlay()}>
            <span class={ATTENDANT.icon()} />
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
        <CardContent class={ATTENDANT.description()}>
          <For each={item.description}>{(paragraph) => <p>{paragraph}</p>}</For>
        </CardContent>
      </AttendantItemCard>
    </button>
  );
}
type AttendantItemProps = { index: number; isFlipped: boolean; item: Attendants["Entity"]; onToggle: () => void };

// CARD ------------------------------------------------------------------------------------------------------------------------------------
function AttendantItemCard({ children, item, ...props }: AttendantItemCardProps) {
  return (
    <Card class={ATTENDANT.card()} {...props}>
      <CardHeader>
        <CardTitle class={ATTENDANT.title()}>{item.name}</CardTitle>
        <CardDescription class={ATTENDANT.badges()}>
          <For each={item.disciplines}>{(discipline) => <DisciplinesBadge slug={discipline.slug} />}</For>
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}
type AttendantItemCardProps = CardProps & { item: Attendants["Entity"] };
