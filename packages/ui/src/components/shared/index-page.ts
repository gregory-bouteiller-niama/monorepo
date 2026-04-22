import { cva } from "class-variance-authority";

// CONSTS ----------------------------------------------------------------------------------------------------------------------------------
const HASH_MARGIN = "-74px 0px -100% 0px";
const HASH_THRESHOLD = 0;

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const INDEX_PAGE = {
  base: cva("flex w-full flex-col items-center px-4 py-8 sm:px-8"),
  hero: cva("flex flex-1 flex-col items-center justify-center gap-12"),
  heroContent: cva("flex w-full max-w-3xl flex-col items-center gap-8 py-8"),
  heroDescription: cva("text-center font-light text-muted-foreground text-xl sm:text-2xl"),
  heroTitle: cva("text-center font-heading text-7xl sm:text-8xl"),
};

// UTILS -----------------------------------------------------------------------------------------------------------------------------------
export const nativeHashUpdater = (hash: string) => {
  const oldURL = window.location.href;
  history.replaceState(null, "", `#${hash}`);
  window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL: window.location.href }));
};

export function updateHash(updater: (hash: string) => void | Promise<void>) {
  const sections = document.querySelectorAll("[data-section]");

  const observer = new IntersectionObserver(
    async (entries) => {
      for (const { isIntersecting, target } of entries) {
        const hash = target.id?.startsWith("top") ? "top" : target.id;
        if (!isIntersecting || location.hash === `#${hash}`) continue;
        await updater(hash);
      }
    },
    { rootMargin: HASH_MARGIN, threshold: HASH_THRESHOLD }
  );

  for (const section of sections) observer.observe(section);
  return () => observer.disconnect();
}
