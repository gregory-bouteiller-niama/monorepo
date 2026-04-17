import { cva } from "class-variance-authority";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const CAROUSEL = {
  base: cva("relative"),
  content: cva("flex data-[orientation=vertical]:-mt-4 data-[orientation=horizontal]:-ml-4 data-[orientation=vertical]:flex-col"),
  item: cva("min-w-0 shrink-0 grow-0 basis-full data-[orientation=vertical]:pt-4 data-[orientation=horizontal]:pl-4"),
  next: cva(`absolute touch-manipulation rounded-full 
    data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-right-12 data-[orientation=horizontal]:-translate-y-1/2 
    data-[orientation=vertical]:-bottom-12 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 
    data-[orientation=vertical]:rotate-90`),
  previous: cva(`absolute touch-manipulation rounded-full 
    data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-left-12 data-[orientation=horizontal]:-translate-y-1/2 
    data-[orientation=vertical]:-top-12 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 
    data-[orientation=vertical]:rotate-90`),
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
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const onSelect = useCallback((nextApi: CarouselApi) => {
    if (!nextApi) return;
    setCanScrollPrev(nextApi.canScrollPrev());
    setCanScrollNext(nextApi.canScrollNext());
    setSelectedIndex(nextApi.selectedScrollSnap());
    setSlideCount(nextApi.scrollSnapList().length);
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollNext, scrollPrev]
  );

  useEffect(() => {
    if (!(api && setApi)) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        slideCount,
      }}
    >
      <section
        aria-roledescription="carousel"
        className={CAROUSEL.base({ className })}
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

export type CarouselApiType = CarouselApi;
export type CarouselPropsType = CarouselProps;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function CarouselContent({ className, viewportClassName, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className={cn(CAROUSEL.viewport(), viewportClassName)} data-slot="carousel-content" ref={carouselRef}>
      <div className={cn(CAROUSEL.content(), className)} data-orientation={orientation} {...props} />
    </div>
  );
}
export type CarouselContentProps = React.ComponentProps<"div"> & { viewportClassName?: string };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return <section className={cn(CAROUSEL.item(), className)} data-orientation={orientation} data-slot="carousel-item" {...props} />;
}
export type CarouselItemProps = React.ComponentProps<"section">;

// NEXT ------------------------------------------------------------------------------------------------------------------------------------
export function CarouselNext({ className, variant = "outline", size = "icon-sm", ...props }: CarouselNextProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      className={cn(CAROUSEL.next(), className)}
      data-orientation={orientation}
      data-slot="carousel-next"
      disabled={!canScrollNext}
      onClick={scrollNext}
      size={size}
      variant={variant}
      {...props}
    >
      <span className="icon-[tabler--chevron-right]" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}
export type CarouselNextProps = Omit<React.ComponentProps<typeof Button>, "className"> & { className?: string };

// PREVIOUS --------------------------------------------------------------------------------------------------------------------------------
export function CarouselPrevious({ className, variant = "outline", size = "icon-sm", ...props }: CarouselPreviousProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      className={cn(CAROUSEL.previous(), className)}
      data-orientation={orientation}
      data-slot="carousel-previous"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      size={size}
      variant={variant}
      {...props}
    >
      <span className="icon-[tabler--chevron-left]" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}
export type CarouselPreviousProps = Omit<React.ComponentProps<typeof Button>, "className"> & { className?: string };

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  slideCount: number;
} & CarouselProps;

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
