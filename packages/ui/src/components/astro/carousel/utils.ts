import EmblaCarousel from "embla-carousel";
import type { createCarouselStore } from "../../shared/carousel";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const carouselManagers = new Map<HTMLElement, () => void>();

// INIT ------------------------------------------------------------------------------------------------------------------------------------
export function initCarousel(el: HTMLElement, store: CarouselStore) {
  const existingDestroy = carouselManagers.get(el);
  if (existingDestroy) return existingDestroy;

  const viewportEl = el.querySelector<HTMLElement>('[data-slot="carousel-content"]');
  if (!viewportEl) throw new Error("Carousel content element not found");

  el.dataset.axis = store.state.opts.axis ?? "x";

  const api = EmblaCarousel(viewportEl, store.state.opts, store.state.plugins);
  const prevEl = el.querySelector<HTMLButtonElement>('[data-slot="carousel-previous"]');
  const nextEl = el.querySelector<HTMLButtonElement>('[data-slot="carousel-next"]');
  let currentOptsJson = JSON.stringify(store.state.opts);
  const unbindApi = store.actions.bindApi(api);
  const handleClickPrev = () => store.state.api?.goToPrev();
  const handleClickNext = () => store.state.api?.goToNext();

  const applyState = () => {
    const { canGoToNext, canGoToPrev, opts, plugins } = store.state;
    const nextOptsJson = JSON.stringify(opts);

    prevEl?.toggleAttribute("disabled", !canGoToPrev);
    prevEl?.setAttribute("aria-disabled", (!canGoToPrev).toString());
    nextEl?.toggleAttribute("disabled", !canGoToNext);
    nextEl?.setAttribute("aria-disabled", (!canGoToNext).toString());

    if (nextOptsJson !== currentOptsJson) {
      currentOptsJson = nextOptsJson;
      api.reInit(opts, plugins);
    }
  };

  const { unsubscribe } = store.subscribe(() => applyState());

  prevEl?.addEventListener("click", handleClickPrev);
  nextEl?.addEventListener("click", handleClickNext);
  el.addEventListener("keydown", store.actions.handleKeydown);

  applyState();

  const destroy = () => {
    unsubscribe();
    unbindApi();
    prevEl?.removeEventListener("click", handleClickPrev);
    nextEl?.removeEventListener("click", handleClickNext);
    el.removeEventListener("keydown", store.actions.handleKeydown);
    carouselManagers.delete(el);
    api.destroy();
  };

  carouselManagers.set(el, destroy);
  return destroy;
}

// DEFINE ----------------------------------------------------------------------------------------------------------------------------------
export function defineCarousel({ name, setup }: DefineCarouselArgs) {
  if (customElements.get(name)) return;

  customElements.define(
    name,
    class extends HTMLElement {
      private destroy: () => void = () => undefined;

      connectedCallback() {
        const el = this.querySelector<HTMLElement>('[data-slot="carousel"]');
        if (!el) throw new Error("Carousel root element not found");
        this.destroy = setup(el);
      }

      disconnectedCallback() {
        this.destroy();
      }
    }
  );
}
type DefineCarouselArgs = { name: string; setup: (rootElement: HTMLElement) => () => void };
type CarouselStore = ReturnType<typeof createCarouselStore>;
