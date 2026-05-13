import type { Disciplines } from "@niama/domain/functions/disciplines";
import { AUTOPLAY, DISCIPLINE, DISCIPLINES } from "@niama/ui/disciplines/carousel";
import { bindGlows } from "@niama/ui/glow";
import { prefersReducedMotion } from "@niama/ui/motion";
import { cn } from "@niama/ui-solid/lib/utils";
import { createTrackedEffect } from "solid-js";
import { Card, CardContent } from "../card";
import { Logo } from "../logo";

export function DisciplinesCarousel(props: DisciplinesCarouselProps) {
  const { items } = props;
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

    const cleanupGlow = bindGlows();
    let timer: number | undefined;

    if (!prefersReducedMotion()) {
      timer = window.setInterval(scrollNext, AUTOPLAY);
    }

    return () => {
      if (timer) window.clearInterval(timer);
      for (const cleanup of cleanupGlow) cleanup();
    };
  });

  return (
    <section class={DISCIPLINES.base()}>
      <div class={DISCIPLINES.carousel()}>
        <div
          class="overflow-x-clip overflow-y-visible py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={viewportRef}
          style={{ "scroll-snap-type": "x mandatory" }}
        >
          <div class="flex w-max">
            {items.map((item) => (
              <div class={DISCIPLINES.item()} style={{ "scroll-snap-align": "center" }}>
                <DisciplineItem item={item} />
              </div>
            ))}
          </div>
        </div>
        <aside class={DISCIPLINES.controls()}>
          <button aria-label="Voie précédente" class={DISCIPLINES.control()} onClick={scrollPrev} type="button">
            <span class="icon-[tabler--chevron-left]" />
          </button>
          <button aria-label="Voie suivante" class={DISCIPLINES.control()} onClick={scrollNext} type="button">
            <span class="icon-[tabler--chevron-right]" />
          </button>
        </aside>
      </div>
    </section>
  );
}

export type DisciplinesCarouselProps = { items: Disciplines["Entity"][] };

function DisciplineItem(props: DisciplineItemProps) {
  const { class: className, item, ...rest } = props;

  return (
    <Card class={cn(DISCIPLINE.base(), className)} data-discipline={item.slug} data-glow {...rest}>
      <CardContent class={DISCIPLINE.media()}>
        <Logo class={DISCIPLINE.logo()} discipline={item} />
      </CardContent>
      <CardContent class={DISCIPLINE.content()}>
        <h3 class={DISCIPLINE.title()}>{item.title}</h3>
        {item.description.map((sentence) => (
          <p class={DISCIPLINE.description()}>{sentence}</p>
        ))}
      </CardContent>
    </Card>
  );
}

type DisciplineItemProps = {
  class?: string;
  item: Disciplines["Entity"];
};
