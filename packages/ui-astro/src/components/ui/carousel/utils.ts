import { CLONE_ATTR, CLONE_ATTRS, type createCarouselStore, FOCUSABLE_SELECTOR, getOriginalSlideNodes } from "@niama/ui/carousel";
import { subscribeSelector } from "@niama/ui/lib/stores/selector";
import EmblaCarousel from "embla-carousel";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const cleanups = new Map<HTMLElement, () => void>();

// INIT ------------------------------------------------------------------------------------------------------------------------------------
export function initCarousel(el: HTMLElement, store: CarouselStore) {
  const existingCleanup = cleanups.get(el);
  if (existingCleanup) return existingCleanup;

  const viewportEl = el.querySelector<HTMLElement>('[data-slot="carousel-content"]');
  if (!viewportEl) throw new Error("Carousel content element not found");

  el.dataset.axis = store.state.opts.axis ?? "x";

  const api = EmblaCarousel(viewportEl, store.state.opts, store.state.plugins);
  const unbindApi = store.actions.bindApi(api);
  const unbindLayout = bindLayout(store, api.containerNode());
  const unbindControls = bindControls(store, el);

  const cleanup = () => {
    unbindControls();
    unbindLayout();
    unbindApi();
    cleanups.delete(el);
    api.destroy();
  };

  cleanups.set(el, cleanup);
  return cleanup;
}

// LAYOUT ----------------------------------------------------------------------------------------------------------------------------------
function bindLayout(store: CarouselStore, containerEl: HTMLElement) {
  const removeClones = () => {
    for (const cloneEl of containerEl.querySelectorAll(`[${CLONE_ATTR}]`)) cloneEl.remove();
  };

  const addClones = () => {
    const fragment = document.createDocumentFragment();
    for (const itemEl of getOriginalSlideNodes(store.state.api?.slideNodes() ?? [])) {
      const cloneEl = itemEl.cloneNode(true);
      if (!(cloneEl instanceof HTMLElement)) continue;
      for (const [name, value] of Object.entries(CLONE_ATTRS)) cloneEl.setAttribute(name, `${value}`);
      for (const focusableEl of cloneEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) focusableEl.tabIndex = -1;
      fragment.append(cloneEl);
    }
    containerEl.append(fragment);
  };

  const { unsubscribe } = subscribeSelector(
    store,
    ({ allSlidesClipped, opts }) => ({ allSlidesClipped, jsonOpts: JSON.stringify(opts) }),
    ({ allSlidesClipped }, prev) => {
      if (allSlidesClipped !== prev.allSlidesClipped) {
        removeClones();
        if (allSlidesClipped) addClones();
      }
      store.state.api?.reInit(store.state.opts, store.state.plugins);
    },
    (a, b) => a.allSlidesClipped === b.allSlidesClipped && a.jsonOpts === b.jsonOpts
  );

  if (store.state.allSlidesClipped) addClones();
  store.state.api?.reInit(store.state.opts, store.state.plugins);

  return () => {
    unsubscribe();
    removeClones();
  };
}

// CONTROLS --------------------------------------------------------------------------------------------------------------------------------
function bindControls(store: CarouselStore, el: HTMLElement) {
  const prevEl = el.querySelector<HTMLButtonElement>('[data-slot="carousel-previous"]');
  const nextEl = el.querySelector<HTMLButtonElement>('[data-slot="carousel-next"]');

  const handleClickPrev = () => store.state.api?.goToPrev();
  const handleClickNext = () => store.state.api?.goToNext();

  const updateControl = (el: HTMLButtonElement | null, disabled: boolean) => {
    el?.toggleAttribute("disabled", disabled);
    el?.setAttribute("aria-disabled", disabled.toString());
  };

  const sync = () => {
    updateControl(prevEl, !store.state.canGoToPrev);
    updateControl(nextEl, !store.state.canGoToNext);
  };

  el.addEventListener("keydown", store.actions.handleKeydown);
  prevEl?.addEventListener("click", handleClickPrev);
  nextEl?.addEventListener("click", handleClickNext);

  const { unsubscribe } = subscribeSelector(store, ({ canGoToNext, canGoToPrev }) => `${canGoToNext}:${canGoToPrev}`, sync);

  sync();

  return () => {
    unsubscribe();
    el.removeEventListener("keydown", store.actions.handleKeydown);
    prevEl?.removeEventListener("click", handleClickPrev);
    nextEl?.removeEventListener("click", handleClickNext);
  };
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
