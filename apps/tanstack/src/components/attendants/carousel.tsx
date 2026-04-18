import type { Attendants } from "@niama/domain/functions/attendants";
import { cn } from "@niama/ui/lib/utils";
import { Button } from "@niama/ui/react/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@niama/ui/react/card";
import { ATTENDANTS } from "@niama/ui/shared/attendants/carousel";
import { GLOW } from "@niama/ui/shared/glow";
import { Image } from "@unpic/react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { DisciplinesBadge } from "../disciplines/badge";
import { useGlow } from "../use-glow";

import "@niama/ui/styles/attendants/carousel.css";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const AttendantsCarousel = ({ autoplay = 10, items }: AttendantsCarouselProps) => {
  if (items.length === 0) return null;

  return <AttendantsCarouselContent autoplay={autoplay} items={items} />;
};
export type AttendantsCarouselProps = { autoplay?: number; items: Attendants["Entity"][] };

function AttendantsCarouselContent({ autoplay, items }: AttendantsCarouselProps) {
  const plugins = Number.isNaN(autoplay) ? undefined : [Autoplay({ delay: autoplay * 1000, stopOnInteraction: true })];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false }, plugins);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const syncEmblaState = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    syncEmblaState();
    emblaApi.on("reInit", syncEmblaState);
    emblaApi.on("select", syncEmblaState);

    return () => {
      emblaApi.off("reInit", syncEmblaState);
      emblaApi.off("select", syncEmblaState);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (displayedIndex === selectedIndex) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !document.startViewTransition) {
      setDisplayedIndex(selectedIndex);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        setDisplayedIndex(selectedIndex);
      });
    });
  }, [displayedIndex, selectedIndex]);

  const active = items[displayedIndex];

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <section aria-roledescription="carousel" className={ATTENDANTS.base()} onKeyDownCapture={handleKeyDown} role="region">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-0" ref={emblaRef}>
        <div className="flex">
          {items.map(({ image }) => (
            <section aria-hidden="true" className="min-h-96 min-w-0 shrink-0 grow-0 basis-full" key={image.alt}>
              <div className="size-full" />
            </section>
          ))}
        </div>
      </div>
      <aside className={ATTENDANTS.aside()}>
        {items.map(({ image }, index) => (
          <Image
            {...image}
            className={cn(ATTENDANTS.image(), getImageStatus(index, displayedIndex, items.length))}
            data-index={index}
            key={image.alt}
            operations={{ imagekit: { f: "avif" } }}
            sizes="(min-width: 1280px) 536px, (min-width: 1024px) 440px, (min-width: 768px) 704px, (min-width: 640px) 576px, 100vw"
          />
        ))}
      </aside>
      <main className={ATTENDANTS.main()}>
        <div className={ATTENDANTS.panelContainer()}>
          <div className={cn(ATTENDANTS.cardPanel(), "absolute inset-0 [view-transition-name:attendants-card]")}>
            <AttendantGlowCard className={ATTENDANTS.card()}>
              <CardHeader>
                <CardTitle className={ATTENDANTS.name()}>{active.name}</CardTitle>
                <CardDescription className={ATTENDANTS.disciplines()}>
                  {active.disciplines.map(({ slug }) => (
                    <DisciplinesBadge className={ATTENDANTS.badge()} key={slug} slug={slug} />
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent className={ATTENDANTS.description()}>
                {active.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </CardContent>
            </AttendantGlowCard>
          </div>
        </div>
        <div className={ATTENDANTS.actions()}>
          <Button
            aria-label="Participant précédent"
            className="cursor-pointer"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            size="icon-sm"
            variant="outline"
          >
            <span className="icon-[lucide--chevron-left]" />
          </Button>
          <Button
            aria-label="Participant suivant"
            className="cursor-pointer"
            disabled={!canScrollNext}
            onClick={scrollNext}
            size="icon-sm"
            variant="outline"
          >
            <span className="icon-[lucide--chevron-right]" />
          </Button>
        </div>
      </main>
    </section>
  );
}

function AttendantGlowCard({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  const { props, ref } = useGlow();

  return (
    <Card className={cn(GLOW(), className)} ref={ref} {...props}>
      {children}
    </Card>
  );
}

function getImageStatus(index: number, activeIndex: number, size: number) {
  if (index === activeIndex) return ATTENDANTS.imageCurrent();
  if ((activeIndex + 1) % size === index) return ATTENDANTS.imageNext();
  if ((activeIndex - 1 + size) % size === index) return ATTENDANTS.imagePrev();
  return ATTENDANTS.imageOther();
}
