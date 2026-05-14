import { CAROUSEL, type CarouselStore, CLONE_ATTR } from "@niama/ui/carousel";
import { cn } from "@niama/ui-solid/lib/utils";
import { Button, type ButtonProps } from "@niama/ui-solid/ui/button";
import { createStoreContext, shallow, useSelector } from "@tanstack/solid-store";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-solid";
import { type ComponentProps, createContext, createEffect, mergeProps, on, Show, splitProps, useContext } from "solid-js";

// CONTEXT ---------------------------------------------------------------------------------------------------------------------------------
const { StoreProvider: CarouselProvider, useStoreContext: useCarousel } = createStoreContext<CarouselContextProps>();
type CarouselContextProps = { ref: UseEmblaCarouselType[0]; store: CarouselStore };
const CarouselCloneContext = createContext(false);

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export const Carousel = (props: CarouselProps) => {
  const [local, others] = splitProps(props, ["children", "class", "store"]);
  const opts = useSelector(local.store, (state) => state.opts, { compare: shallow });
  const plugins = useSelector(local.store, (state) => state.plugins);
  const [ref, api] = useEmblaCarousel(opts, plugins);

  createEffect(
    on(api, (api) => {
      if (api) local.store.actions.bindApi(api);
    })
  );

  return (
    <CarouselProvider value={{ ref, store: local.store }}>
      {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: carousel keyboard navigation */}
      <section
        aria-roledescription="carousel"
        class={cn(CAROUSEL.base(), local.class)}
        data-axis={opts().axis ?? "x"}
        data-slot="carousel"
        onKeyDown={local.store.actions.handleKeydown}
        role="region"
        {...others}
      >
        {local.children}
      </section>
    </CarouselProvider>
  );
};
type CarouselProps = ComponentProps<"section"> & Pick<CarouselContextProps, "store">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export const CarouselContent = (props: CarouselContentProps) => {
  const [local, others] = splitProps(props, ["children", "class", "viewportClass"]);
  const { ref, store } = useCarousel();
  const allSlidesClipped = useSelector(store, ({ allSlidesClipped }) => allSlidesClipped);

  return (
    <div class={cn(CAROUSEL.viewport(), local.viewportClass)} data-slot="carousel-content" ref={ref}>
      <div class={cn(CAROUSEL.content(), local.class)} data-slot="carousel-container" {...others}>
        {local.children}
        <Show when={allSlidesClipped()}>
          <CarouselCloneContext.Provider value>{local.children}</CarouselCloneContext.Provider>
        </Show>
      </div>
    </div>
  );
};
type CarouselContentProps = ComponentProps<"div"> & { viewportClass?: string };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export const CarouselItem = (props: CarouselItemProps) => {
  const [local, others] = splitProps(props, ["children", "class"]);
  const clone = useContext(CarouselCloneContext);

  return (
    // biome-ignore lint/a11y/useSemanticElements: carousel slide semantics
    <section
      aria-hidden={clone}
      aria-roledescription="slide"
      class={cn(CAROUSEL.item(), local.class)}
      data-slot="carousel-item"
      inert={clone}
      role="group"
      {...{ [CLONE_ATTR]: clone ? "" : undefined }}
      {...others}
    >
      {local.children}
    </section>
  );
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
