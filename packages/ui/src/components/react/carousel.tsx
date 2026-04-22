import { cva } from "class-variance-authority";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useEmblaCarousel, { type EmblaRootNodeRefType } from "embla-carousel-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const CAROUSEL = {
  base: cva("group/carousel relative"),
  content: cva(`flex 
    group-data-[orientation=vertical]/carousel:-mt-4 group-data-[orientation=horizontal]/carousel:-ml-4 
    group-data-[orientation=vertical]/carousel:flex-col`),
  item: cva(`min-w-0 shrink-0 grow-0 basis-full 
    group-data-[orientation=vertical]/carousel:pt-4 group-data-[orientation=horizontal]/carousel:pl-4`),
  next: cva(`absolute touch-manipulation rounded-full 
    group-data-[orientation=horizontal]/carousel:top-1/2 group-data-[orientation=horizontal]/carousel:-right-12 
    group-data-[orientation=horizontal]/carousel:-translate-y-1/2 group-data-[orientation=vertical]/carousel:-bottom-12 
    group-data-[orientation=vertical]/carousel:left-1/2 group-data-[orientation=vertical]/carousel:-translate-x-1/2 
    group-data-[orientation=vertical]/carousel:rotate-90`),
  previous: cva(`absolute touch-manipulation rounded-full 
    group-data-[orientation=horizontal]/carousel:top-1/2 group-data-[orientation=horizontal]/carousel:-left-12 
    group-data-[orientation=horizontal]/carousel:-translate-y-1/2 group-data-[orientation=vertical]/carousel:-top-12 
    group-data-[orientation=vertical]/carousel:left-1/2 group-data-[orientation=vertical]/carousel:-translate-x-1/2 
    group-data-[orientation=vertical]/carousel:rotate-90`),
  viewport: cva("overflow-hidden"),
};

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const CarouselContext = createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Carousel(props: CarouselProps & React.ComponentProps<"section">) {
  const { orientation = "horizontal", opts, setApi, plugins, className, children, ...rest } = props;
  const [options, setOptions] = useState(opts);
  const [carouselRef, api] = useEmblaCarousel({ ...options, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
  const [canGoToNext, setCanGoToNext] = useState(false);
  const [canGoToPrev, setCanGoToPrev] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const onReinit = useCallback((nextApi: EmblaCarouselType) => {
    if (!nextApi) return;
    const { containerRect, slideRects } = nextApi.internalEngine();
    const lastSlideRect = [...slideRects].pop();
    const slidesLessThanViewport = containerRect.right > (lastSlideRect?.right ?? 0);
    const newOptions = slidesLessThanViewport
      ? ({ containScroll: false, slidesToScroll: "auto" } as const)
      : ({ containScroll: "trimSnaps", slidesToScroll: 1 } as const);

    setOptions((currentOptions) => ({ ...currentOptions, ...newOptions }));
  }, []);

  const onSelect = useCallback((nextApi: EmblaCarouselType) => {
    if (!nextApi) return;
    setCanGoToPrev(nextApi.canGoToPrev());
    setCanGoToNext(nextApi.canGoToNext());
    setSelectedIndex(nextApi.selectedSnap());
    setSlideCount(nextApi.snapList().length);
  }, []);

  const goTo = useCallback((index: number) => api?.goTo(index), [api]);
  const goToPrev = useCallback(() => api?.goToPrev(), [api]);
  const goToNext = useCallback(() => api?.goToNext(), [api]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      }
    },
    [goToNext, goToPrev]
  );

  useEffect(() => {
    if (!(api && setApi)) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    onReinit(api);

    api.on("reinit", onReinit);
    api.on("reinit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reinit", onReinit);
      api.off("reinit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onReinit, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        goToPrev,
        goToNext,
        goTo,
        canGoToPrev,
        canGoToNext,
        selectedIndex,
        slideCount,
      }}
    >
      <section
        aria-roledescription="carousel"
        className={cn(CAROUSEL.base(), className)}
        data-orientation={orientation ?? (opts?.axis === "y" ? "vertical" : "horizontal")}
        data-slot="carousel"
        onKeyDownCapture={handleKeyDown}
        role="region"
        {...rest}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}

export type CarouselPropsType = CarouselProps;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function CarouselContent({ className, viewportClassName, ...props }: CarouselContentProps) {
  const { carouselRef } = useCarousel();

  return (
    <div className={cn(CAROUSEL.viewport(), viewportClassName)} data-slot="carousel-content" ref={carouselRef}>
      <div className={cn(CAROUSEL.content(), className)} {...props} />
    </div>
  );
}
export type CarouselContentProps = React.ComponentProps<"div"> & { viewportClassName?: string };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export function CarouselItem({ className, ...props }: CarouselItemProps) {
  return <section className={cn(CAROUSEL.item(), className)} data-slot="carousel-item" {...props} />;
}
export type CarouselItemProps = React.ComponentProps<"section">;

// NEXT ------------------------------------------------------------------------------------------------------------------------------------
export function CarouselNext({ className, variant = "outline", size = "icon-sm", ...props }: CarouselNextProps) {
  const { goToNext, canGoToNext } = useCarousel();

  return (
    <Button
      className={cn(CAROUSEL.next(), className)}
      data-slot="carousel-next"
      disabled={!canGoToNext}
      onClick={goToNext}
      size={size}
      variant={variant}
      {...props}
    >
      <span className="icon-[tabler--chevron-right]" />
      <span className="sr-only">Suivant</span>
    </Button>
  );
}
export type CarouselNextProps = Omit<React.ComponentProps<typeof Button>, "className"> & { className?: string };

// PREVIOUS --------------------------------------------------------------------------------------------------------------------------------
export function CarouselPrevious({ className, variant = "outline", size = "icon-sm", ...props }: CarouselPreviousProps) {
  const { goToPrev, canGoToPrev } = useCarousel();

  return (
    <Button
      className={cn(CAROUSEL.previous(), className)}
      data-slot="carousel-previous"
      disabled={!canGoToPrev}
      onClick={goToPrev}
      size={size}
      variant={variant}
      {...props}
    >
      <span className="icon-[tabler--chevron-left]" />
      <span className="sr-only">Précédent</span>
    </Button>
  );
}
export type CarouselPreviousProps = Omit<React.ComponentProps<typeof Button>, "className"> & { className?: string };

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type CarouselContextProps = {
  api: EmblaCarouselType | undefined;
  canGoToPrev: boolean;
  canGoToNext: boolean;
  carouselRef: EmblaRootNodeRefType;
  goTo: (index: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  selectedIndex: number;
  slideCount: number;
} & CarouselProps;

type CarouselProps = {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: EmblaCarouselType) => void;
};
