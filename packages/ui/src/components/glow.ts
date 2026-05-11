import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const GLOW = cva(`relative overflow-hidden rounded-3xl border-none p-8 
	before:absolute before:inset-0 before:content-[''] before:opacity-(--glow-opacity,0) before:transition-opacity before:duration-500 
	before:from-primary/25 before:to-transparent before:to-80% before:bg-radial-[circle_at_var(--glow-x,50%)_var(--glow-y,50%)]
	data-[discipline=yogart]:before:from-yogart/25 data-[discipline=anima]:before:from-anima/25 data-[discipline=animus]:before:from-animus/25 
	data-[discipline=astro]:before:from-astro/25`);

// UTILS -----------------------------------------------------------------------------------------------------------------------------------
export const showGlowAt = (el: HTMLElement | null, x: number, y: number) => {
  moveGlowTo(el, x, y);
  setGlowOpacity(el, 0.6);
};

export const initializeGlow = (el: HTMLElement | null) => {
  setGlowOpacity(el, 0);
  setGlowCoords(el, "50%", "50%");
};

export const hideGlow = (el: HTMLElement | null) => setGlowOpacity(el, 0);

export const moveGlowTo = (el: HTMLElement | null, x: number, y: number) => {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  setGlowCoords(el, `${x - rect.left}px`, `${y - rect.top}px`);
};

// NATIVE ----------------------------------------------------------------------------------------------------------------------------------
export const bindGlow = (el: HTMLElement) => {
  initializeGlow(el);

  const handlePointerMove = ({ clientX, clientY }: PointerEvent) => moveGlowTo(el, clientX, clientY);
  const handlePointerEnter = ({ clientX, clientY }: PointerEvent) => showGlowAt(el, clientX, clientY);
  const handlePointerLeave = () => hideGlow(el);

  el.addEventListener("pointermove", handlePointerMove);
  el.addEventListener("pointerenter", handlePointerEnter);
  el.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    el.removeEventListener("pointermove", handlePointerMove);
    el.removeEventListener("pointerenter", handlePointerEnter);
    el.removeEventListener("pointerleave", handlePointerLeave);
  };
};

export const bindGlows = () =>
  Array.from(document.querySelectorAll<HTMLElement>("[data-glow]")).map((el) => {
    if (!el || el.dataset.initialized === "true") return () => undefined;
    el.dataset.initialized = "true";
    const unbind = bindGlow(el);

    return () => {
      unbind();
      delete el.dataset.initialized;
    };
  });

// PRIVATE ---------------------------------------------------------------------------------------------------------------------------------
export const setGlowOpacity = (el: HTMLElement | null, opacity: number) => el?.style.setProperty("--glow-opacity", `${opacity}`);

export const setGlowCoords = (el: HTMLElement | null, x: string, y: string) => {
  el?.style.setProperty("--glow-x", x);
  el?.style.setProperty("--glow-y", y);
};
