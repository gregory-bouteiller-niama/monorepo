import EmblaCarousel, { type EmblaOptionsType, type EmblaPluginType } from "embla-carousel";
import { getHandleClickNext, getHandleClickPrev, getHandleKeydown, updateOpts } from "../../shared/carousel";

export function initCarousel(el: HTMLElement | null, opts: EmblaOptionsType = {}, plugins: EmblaPluginType[] = []) {
  if (!el) {
    console.warn("Carousel element not found");
    return null;
  }
  if (el.dataset.initialized === "true") return null;

  const viewportEl = el.querySelector<HTMLElement>('[data-slot="carousel-content"]');
  if (!viewportEl) {
    console.warn("Carousel content element not found");
    return null;
  }

  el.dataset.initialized = "true";
  el.dataset.axis = opts.axis ?? "x";

  const api = EmblaCarousel(viewportEl, opts, plugins);
  let currentOpts = opts;

  const prevEl = el.querySelector<HTMLButtonElement>('[data-slot="carousel-previous"]');
  const nextEl = el.querySelector<HTMLButtonElement>('[data-slot="carousel-next"]');

  const handleClickPrev = getHandleClickPrev(api);
  const handleClickNext = getHandleClickNext(api);
  const handleKeydown = getHandleKeydown(api, opts);

  const updateControls = () => {
    const isPrevDisabled = !api.canGoToPrev();
    const isNextDisabled = !api.canGoToNext();
    prevEl?.toggleAttribute("disabled", isPrevDisabled);
    prevEl?.setAttribute("aria-disabled", isPrevDisabled.toString());
    nextEl?.toggleAttribute("disabled", isNextDisabled);
    nextEl?.setAttribute("aria-disabled", isNextDisabled.toString());
  };

  const update = () => {
    const prevOpts = currentOpts;
    currentOpts = updateOpts(api)(prevOpts);
    if (JSON.stringify(currentOpts) !== JSON.stringify(prevOpts)) api.reInit(currentOpts, plugins);
    updateControls();
  };

  prevEl?.addEventListener("click", handleClickPrev);
  nextEl?.addEventListener("click", handleClickNext);
  el.addEventListener("keydown", handleKeydown);

  update();

  api.on("select", updateControls);
  api.on("reinit", update);

  return {
    api,
    destroy: () => {
      prevEl?.removeEventListener("click", handleClickPrev);
      nextEl?.removeEventListener("click", handleClickNext);
      el.removeEventListener("keydown", handleKeydown);
      delete el.dataset.initialized;
      api.destroy();
    },
  };
}
