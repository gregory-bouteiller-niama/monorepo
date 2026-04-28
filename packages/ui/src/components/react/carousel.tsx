import { createStoreContext, type Store, useSelector } from "@tanstack/react-store";
import useEmblaCarousel, { type EmblaRootNodeRefType } from "embla-carousel-react";
import { Children, cloneElement, isValidElement, useEffect } from "react";
import { cn } from "../../lib/utils";
import { CAROUSEL, type CarouselActions, type CarouselState, CLONE_ATTRS } from "../shared/carousel";
import { Button } from "./button";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const { StoreProvider: CarouselProvider, useStoreContext: useCarousel } = createStoreContext<CarouselContextProps>();

type CarouselContextProps = { ref: EmblaRootNodeRefType; store: Store<CarouselState, CarouselActions> };

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Carousel({ store, className, children, ...rest }: CarouselProps) {
  const opts = useSelector(store, (state) => state.opts);
  const plugins = useSelector(store, (state) => state.plugins);
  const [ref, api] = useEmblaCarousel(opts, plugins);

  useEffect(() => (api ? store.actions.bindApi(api) : undefined), [api, store]);

  return (
    <CarouselProvider value={{ ref, store }}>
      <section
        aria-roledescription="carousel"
        className={cn(CAROUSEL.base(), className)}
        data-axis={opts.axis ?? "x"}
        data-slot="carousel"
        onKeyDownCapture={store.actions.handleKeydown}
        role="region"
        {...rest}
      >
        {children}
      </section>
    </CarouselProvider>
  );
}
export type CarouselProps = React.ComponentProps<"section"> & Pick<CarouselContextProps, "store">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function CarouselContent({ children, className, viewportClassName, ...props }: CarouselContentProps) {
  const { ref, store } = useCarousel();
  const shouldDuplicateSlides = useSelector(store, ({ shouldDuplicateSlides }) => shouldDuplicateSlides);

  let slides = children;

  if (shouldDuplicateSlides) {
    const childArray = Children.toArray(children);
    slides = [
      ...childArray,
      ...childArray.map((c) => (isValidElement(c) ? cloneElement(c, { ...CLONE_ATTRS, key: `${c.key ?? "slide"}:clone` }) : c)),
    ];
  }

  return (
    <div className={cn(CAROUSEL.viewport(), viewportClassName)} data-slot="carousel-content" ref={ref}>
      <div className={cn(CAROUSEL.content(), className)} data-slot="carousel-container" {...props}>
        {slides}
      </div>
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
  const { store } = useCarousel();
  const api = useSelector(store, (state) => state.api);
  const canGoToNext = useSelector(store, (state) => state.canGoToNext);

  return (
    <Button
      className={cn(CAROUSEL.next(), className)}
      data-slot="carousel-next"
      disabled={!canGoToNext}
      onClick={() => api?.goToNext()}
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
  const { store } = useCarousel();
  const api = useSelector(store, (state) => state.api);
  const canGoToPrev = useSelector(store, (state) => state.canGoToPrev);

  return (
    <Button
      className={cn(CAROUSEL.previous(), className)}
      data-slot="carousel-previous"
      disabled={!canGoToPrev}
      onClick={() => api?.goToPrev()}
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
