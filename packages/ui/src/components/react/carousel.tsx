import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import useEmblaCarousel, { type EmblaRootNodeRefType } from "embla-carousel-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { CAROUSEL, getHandleClickNext, getHandleClickPrev, getHandleKeydown, updateOpts } from "../shared/carousel";
import { Button } from "./button";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const CarouselContext = createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Carousel({ opts: inputOpts = {}, setApi, plugins, className, children, ...rest }: CarouselProps) {
  const [opts, setOpts] = useState(inputOpts);
  const [carouselRef, api] = useEmblaCarousel(opts, plugins);

  const handleReinit = useCallback((api: EmblaCarouselType) => setOpts(updateOpts(api)), []);

  useEffect(() => (api && setApi ? setApi(api) : undefined), [api, setApi]);

  useEffect(() => {
    if (!api) return;
    handleReinit(api);
    api.on("reinit", handleReinit);
    return () => {
      api.off("reinit", handleReinit);
    };
  }, [api, handleReinit]);

  return (
    <CarouselContext.Provider value={{ api, carouselRef, opts }}>
      <section
        aria-roledescription="carousel"
        className={cn(CAROUSEL.base(), className)}
        data-axis={opts?.axis}
        data-slot="carousel"
        onKeyDownCapture={getHandleKeydown(api, opts)}
        role="region"
        {...rest}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
}
export type CarouselProps = React.ComponentProps<"section"> & {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  setApi?: (api: EmblaCarouselType) => void;
};

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
  const { api } = useCarousel();

  return (
    <Button
      className={cn(CAROUSEL.next(), className)}
      data-slot="carousel-next"
      disabled={!api?.canGoToNext}
      onClick={getHandleClickNext(api)}
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
  const { api } = useCarousel();

  return (
    <Button
      className={cn(CAROUSEL.previous(), className)}
      data-slot="carousel-previous"
      disabled={!api?.canGoToPrev}
      onClick={getHandleClickPrev(api)}
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
type CarouselContextProps = { api: EmblaCarouselType | undefined; carouselRef: EmblaRootNodeRefType } & Pick<CarouselProps, "opts">;
