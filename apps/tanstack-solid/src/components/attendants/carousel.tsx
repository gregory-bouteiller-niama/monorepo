import type { Attendants } from "@niama/domain/functions/attendants";
import { ATTENDANT, ATTENDANTS, AUTOPLAY, ROTATIONS } from "@niama/ui/attendants/carousel";
import { cn } from "@niama/ui/lib/utils";
import { prefersReducedMotion } from "@niama/ui/motion";
import { Image } from "@unpic/solid";
import { createSignal, createTrackedEffect, type JSX } from "solid-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { DisciplinesBadge } from "../disciplines/badge";

export function AttendantsCarousel(props: AttendantsCarouselProps) {
  const { items } = props;
  const [flippedName, setFlippedName] = createSignal<string | undefined>();
  let viewportRef: HTMLDivElement | undefined;

  const scrollNext = () => {
    if (!viewportRef) return;
    viewportRef.scrollBy({ left: viewportRef.clientWidth * 0.88, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (!viewportRef) return;
    viewportRef.scrollBy({ left: -viewportRef.clientWidth * 0.88, behavior: "smooth" });
  };

  createTrackedEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReducedMotion()) return;
    const timer = window.setInterval(scrollNext, AUTOPLAY);
    return () => window.clearInterval(timer);
  });

  return (
    <section class={ATTENDANTS.base()}>
      <div class={ATTENDANTS.carousel()}>
        <div class={ATTENDANTS.viewport()} ref={viewportRef} style={{ "scroll-snap-type": "x mandatory" }}>
          <div class="flex w-max">
            {items.map((item, renderIndex) => (
              <div class={ATTENDANTS.item()} style={{ "scroll-snap-align": "center" }}>
                <AttendantItem
                  index={renderIndex}
                  isFlipped={flippedName() === item.name}
                  item={item}
                  onToggle={() => {
                    setFlippedName((currentValue) => (currentValue === item.name ? undefined : item.name));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <aside class={ATTENDANTS.controls()}>
          <button aria-label="Participant précédent" class={ATTENDANTS.control()} onClick={scrollPrev} type="button">
            <span class="icon-[tabler--chevron-left]" />
          </button>
          <button aria-label="Participant suivant" class={ATTENDANTS.control()} onClick={scrollNext} type="button">
            <span class="icon-[tabler--chevron-right]" />
          </button>
        </aside>
      </div>
    </section>
  );
}

export type AttendantsCarouselProps = { items: Attendants["Entity"][] };

function AttendantItem(props: AttendantItemProps) {
  const { index, isFlipped, item, onToggle } = props;

  return (
    <button
      aria-label={`Afficher la fiche de ${item.name}`}
      aria-pressed={isFlipped ? "true" : "false"}
      class={cn(ATTENDANT.base(), ROTATIONS[index % ROTATIONS.length])}
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
            alt={item.image.alt}
            background={item.image.background}
            height={item.image.height}
            src={item.image.src}
            width={item.image.width}
          />
        </CardContent>
      </AttendantItemCard>
      <AttendantItemCard data-back item={item}>
        <CardContent class={ATTENDANT.description()}>
          {item.description.map((paragraph) => (
            <p>{paragraph}</p>
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

function AttendantItemCard(props: AttendantItemCardProps) {
  const { children, item, ...rest } = props;

  return (
    <Card class={ATTENDANT.card()} {...rest}>
      <CardHeader>
        <CardTitle class={ATTENDANT.title()}>{item.name}</CardTitle>
        <CardDescription class={ATTENDANT.badges()}>
          {item.disciplines.map(({ slug }) => (
            <DisciplinesBadge slug={slug} />
          ))}
        </CardDescription>
      </CardHeader>
      {children}
    </Card>
  );
}

type AttendantItemCardProps = {
  children?: JSX.Element;
  item: Attendants["Entity"];
  class?: string;
  "data-back"?: boolean;
};
