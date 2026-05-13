import { CAROUSEL, type CarouselStore } from "@niama/ui/carousel";
import { createStoreContext, useSelector } from "@tanstack/solid-store";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-solid";
import type { ComponentProps } from "solid-js";
import { createEffect, mergeProps, on, splitProps } from "solid-js";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/raw/button";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const { StoreProvider: CarouselProvider, useStoreContext: useCarousel } = createStoreContext<CarouselContextProps>();
type CarouselContextProps = { ref: UseEmblaCarouselType[0]; store: CarouselStore };

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export const Carousel = (props: CarouselProps) => {
  const [local, others] = splitProps(props, ["class", "store"]);
  const opts = useSelector(local.store, (state) => state.opts);
  const plugins = useSelector(local.store, (state) => state.plugins);
  const [ref, api] = useEmblaCarousel(opts, plugins);

  createEffect(
    on(api, (api) => {
      if (api) local.store.actions.bindApi(api);
    })
  );

  return (
    <CarouselProvider value={{ ref, store: local.store }}>
      <section
        aria-roledescription="carousel"
        class={cn(CAROUSEL.base(), local.class)}
        data-axis={opts().axis ?? "x"}
        data-slot="carousel"
        onKeyDownCapture={local.store.actions.handleKeydown}
        role="region"
        {...others}
      />
    </CarouselProvider>
  );
};
type CarouselProps = ComponentProps<"section"> & Pick<CarouselContextProps, "store">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export const CarouselContent = (props: CarouselContentProps) => {
  const [local, others] = splitProps(props, ["class", "viewportClass"]);
  const { ref, store } = useCarousel();
  const allSlidesClipped = useSelector(store, ({ allSlidesClipped }) => allSlidesClipped);

  // let slides = local.children;

  // if (allSlidesClipped) {
  //   const all = Children.toArray(children);
  //   slides = [...all, ...all.map((c) => (isValidElement(c) ? cloneElement(c, { ...CLONE_ATTRS, key: `${c.key ?? "slide"}:clone` }) : c))];
  // }

  return (
    <div class={cn(CAROUSEL.viewport(), local.viewportClass)} data-slot="carousel-content" ref={ref}>
      <div class={cn(CAROUSEL.content(), local.class)} data-slot="carousel-container" {...others} />
    </div>
  );
};
type CarouselContentProps = ComponentProps<"div"> & { viewportClass?: string };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export const CarouselItem = (props: CarouselItemProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <section class={cn(CAROUSEL.item(), local.class)} data-slot="carousel-item" {...others} />;
};
type CarouselItemProps = ComponentProps<"section">;

// PREVIOUS ---------------------------------------------------------------------------------------------------------------------------------
export const CarouselPrevious = (props: CarouselPreviousProps) => {
  const mergedProps = mergeProps({ variant: "outline", size: "icon-sm" } as CarouselPreviousProps, props);
  const [local, others] = splitProps(mergedProps, ["class", "variant", "size"]);
  const { store } = useCarousel();
  const api = useSelector(store, (state) => state.api);
  const canGoToPrev = useSelector(store, (state) => state.canGoToPrev);

  return (
    <Button
      class={cn(CAROUSEL.previous(), local.class)}
      data-slot="carousel-previous"
      disabled={!canGoToPrev()}
      onClick={() => api()?.goToPrev()}
      size={local.size}
      variant={local.variant}
      {...others}
    >
      <span class="icon-[tabler--chevron-left]" />
      <span class="sr-only">Précédent</span>
    </Button>
  );
};
type CarouselPreviousProps = ButtonProps;

// NEXT ------------------------------------------------------------------------------------------------------------------------------------
export const CarouselNext = (props: CarouselNextProps) => {
  const mergedProps = mergeProps({ variant: "outline", size: "icon-sm" } as CarouselNextProps, props);
  const [local, others] = splitProps(mergedProps, ["class", "variant", "size"]);
  const { store } = useCarousel();
  const api = useSelector(store, (state) => state.api);
  const canGoToNext = useSelector(store, (state) => state.canGoToNext);

  return (
    <Button
      class={cn(CAROUSEL.next(), local.class)}
      data-slot="carousel-next"
      disabled={!canGoToNext()}
      onClick={() => api()?.goToNext()}
      size={local.size}
      variant={local.variant}
      {...others}
    >
      <span class="icon-[tabler--chevron-right]" />
      <span class="sr-only">Suivant</span>
    </Button>
  );
};
type CarouselNextProps = ButtonProps;
