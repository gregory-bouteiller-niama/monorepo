import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType, type EmblaPluginType } from "embla-carousel";

export function initCarousel(carouselElement: HTMLElement, options: CarouselOptions = {}): CarouselManager | null {
  // don't re-initialize if already initialized
  if (carouselElement.dataset.initialized === "true") return null;
  carouselElement.dataset.initialized = "true";

  if (!carouselElement) {
    console.warn("Carousel element not found");
    return null;
  }

  // Find content element - Embla expects the viewport element, not the container
  const viewportElement = carouselElement.querySelector('[data-slot="carousel-content"]') as HTMLElement;
  if (!viewportElement) {
    console.warn("Carousel content element not found");
    return null;
  }

  // Get configuration from data attributes
  const axisData = carouselElement.dataset.axis;
  const axis: EmblaOptionsType["axis"] = axisData === "y" ? "y" : "x";

  // Safely parse data options
  let dataOpts = {};
  try {
    const optsString = carouselElement.dataset.opts;
    if (optsString && optsString !== "undefined" && optsString !== "null") dataOpts = JSON.parse(optsString);
  } catch (e) {
    console.warn("Failed to parse carousel opts:", e);
    dataOpts = {};
  }

  // Ensure dataOpts is a valid object
  if (!dataOpts || typeof dataOpts !== "object") dataOpts = {};

  // Merge options - ensure we always have a valid object
  const emblaOptions: EmblaOptionsType = {
    axis,
    ...dataOpts,
    ...(options.opts || {}),
  };

  // Handle plugins - EmblaCarousel expects undefined when no plugins, not empty array
  const plugins = options.plugins && options.plugins.length > 0 ? options.plugins : undefined;

  // console.log("ID:", carouselElement.id);
  // console.log("Plugins:", plugins);
  // console.log("Options:", emblaOptions);

  // Find navigation buttons
  const prevButton = carouselElement.querySelector(".starwind-carousel-previous") as HTMLButtonElement;
  const nextButton = carouselElement.querySelector(".starwind-carousel-next") as HTMLButtonElement;

  // Initialize Embla
  const emblaApi: EmblaCarouselType = EmblaCarousel(viewportElement, emblaOptions, plugins);

  // Update button states
  const updateButtons = () => {
    const canGoToPrev = emblaApi.canGoToPrev();
    const canGoToNext = emblaApi.canGoToNext();

    if (prevButton) {
      prevButton.disabled = !canGoToPrev;
      prevButton.setAttribute("aria-disabled", (!canGoToPrev).toString());
    }

    if (nextButton) {
      nextButton.disabled = !canGoToNext;
      nextButton.setAttribute("aria-disabled", (!canGoToNext).toString());
    }
  };

  // Event handlers for cleanup
  const prevClickHandler = () => emblaApi.goToPrev();
  const nextClickHandler = () => emblaApi.goToNext();
  const keydownHandler = (event: KeyboardEvent) => {
    if (axis === "y") {
      // Vertical axis: ArrowUp = previous, ArrowDown = next
      if (event.key === "ArrowUp") {
        event.preventDefault();
        emblaApi.goToPrev();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        emblaApi.goToNext();
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi.goToPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi.goToNext();
    }
  };

  // Setup event listeners
  const setupEventListeners = () => {
    // Navigation button listeners
    prevButton?.addEventListener("click", prevClickHandler);
    nextButton?.addEventListener("click", nextClickHandler);

    // Keyboard navigation
    carouselElement.addEventListener("keydown", keydownHandler);
  };

  // Setup user API callback
  const setupUserCallbacks = () => {
    if (options.setApi) options.setApi(emblaApi);
  };

  // Initialize everything
  updateButtons();
  setupEventListeners();
  setupUserCallbacks();

  // Setup internal event listeners
  emblaApi.on("select", updateButtons);
  emblaApi.on("reinit", () => {
    updateButtons();
  });

  // Return manager interface
  return {
    api: emblaApi,
    goToPrev: () => emblaApi.goToPrev(),
    goToNext: () => emblaApi.goToNext(),
    canGoToPrev: () => emblaApi.canGoToPrev(),
    canGoToNext: () => emblaApi.canGoToNext(),
    destroy: () => {
      // Remove event listeners to prevent memory leaks
      if (prevButton) prevButton.removeEventListener("click", prevClickHandler);
      if (nextButton) nextButton.removeEventListener("click", nextClickHandler);

      carouselElement.removeEventListener("keydown", keydownHandler);

      // Destroy the Embla instance
      emblaApi.destroy();
    },
  };
}

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type CarouselApi = EmblaCarouselType;

export type CarouselOptions = {
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  setApi?: (api: CarouselApi) => void;
};

export type CarouselManager = {
  api: CarouselApi;
  canGoToNext: () => boolean;
  canGoToPrev: () => boolean;
  destroy: () => void;
  goToNext: () => void;
  goToPrev: () => void;
};
