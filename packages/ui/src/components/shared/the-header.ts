import { headerStore, selectStainStyle } from "@niama/ui/lib/stores/header";
import { cva } from "class-variance-authority";
import { toggleThemeWithTransition } from "./theme";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const THE_HEADER = {
  actions: cva("flex gap-1"),
  base: cva(`mx-auto flex h-14.5 items-center justify-between self-center rounded-full border border-transparent px-2
		group-data-scrolled/body:border-muted group-data-scrolled/body:shadow-lg group-data-scrolled/body:backdrop-blur-xl`),
  burger: cva(`cursor-pointer scale-0 
		group-data-scrolled/body:scale-100
		sm:hidden`),
  burgerContent: cva("max-w-3xs rounded-3xl border bg-transparent p-4 shadow-lg backdrop-blur-xl"),
  burgerIcon: cva("icon-[lucide--menu]"),
  burgerItem: cva("uppercase tracking-widest"),
  logo: cva(`duration-300 w-11 scale-0
		group-data-scrolled/body:scale-100`),
  logoMain: cva("z-40 mt-12 mb-4 flex w-32 animate-float flex-col items-center self-center"),
  menu: cva(`sticky top-4 z-50 flex min-h-14.5 w-auto flex-col justify-center self-center border-y py-2
		group-data-scrolled/body:border-transparent`),
  moon: cva(`icon-[lucide--moon] absolute size-4 rotate-90 scale-0 transition-all 
		dark:rotate-0 dark:scale-100`),
  nav: cva(`flex flex-col items-center 
		group-data-scrolled/body:hidden 
		sm:flex-row
		group-data-scrolled/body:sm:flex`),
  navLink: cva(`relative cursor-pointer px-4 py-2 uppercase tracking-widest text-base
		sm:px-2 sm:py-1 sm:text-sm 
		md:px-4 md:py-2 md:text-base`),
  stain: cva("absolute inset-0 rounded-full bg-accent opacity-0 transition-all"),
  stainContent: cva("relative z-10"),
  sun: cva(`icon-[lucide--sun] size-4 rotate-0 scale-100 transition-all 
		dark:-rotate-90 dark:scale-0`),
  themeSwitcher: cva("cursor-pointer"),
  wrapper: cva("fixed inset-x-4 top-4 z-50"),
};

// UTILS -----------------------------------------------------------------------------------------------------------------------------------
export const clearHovered = () => headerStore.actions.setHovered();

export const observeNavLink = (hash: string, link: HTMLElement) => {
  headerStore.actions.setNavLinkStyle(hash, link);
  const observer = new ResizeObserver(() => headerStore.actions.setNavLinkStyle(hash, link));
  observer.observe(link);
  return () => observer.disconnect();
};

// ASTRO -----------------------------------------------------------------------------------------------------------------------------------
export const initialize = () => {
  initializeHeaderNav();
  initializeThemeSwitcher();
};

const initializeHeaderNav = () => {
  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const stain = document.querySelector<HTMLElement>("[data-nav-stain]");
  const links = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-link]"));

  let cleaners: (() => void)[] = [];

  const handleHashChange = () => {
    const hash = window.location.hash.replace("#", "");
    for (const link of links) {
      if (link.getAttribute("href") === window.location.pathname + window.location.hash) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
    headerStore.actions.setActive(hash === "top" ? undefined : hash);
  };
  window.addEventListener("hashchange", handleHashChange);
  cleaners = [...cleaners, () => window.removeEventListener("hashchange", handleHashChange)];

  nav?.addEventListener("mouseleave", clearHovered);
  cleaners = [...cleaners, () => nav?.removeEventListener("mouseleave", clearHovered)];

  for (const link of links) {
    const hash = link.dataset.navLink;
    if (!hash) continue;
    const handleOnMouseEnter = () => headerStore.actions.setHovered(hash);
    link.addEventListener("mouseenter", handleOnMouseEnter);
    cleaners = [...cleaners, observeNavLink(hash, link), () => link.removeEventListener("mouseenter", handleOnMouseEnter)];
  }

  const { unsubscribe } = headerStore.subscribe((state) => Object.assign(stain?.style ?? {}, selectStainStyle(state)));

  return () => {
    unsubscribe();
    for (const cleaner of cleaners) cleaner();
  };
};

const initializeThemeSwitcher = () => {
  const switcher = document.querySelector<HTMLElement>("[data-theme-switcher]");
  if (!switcher) throw new Error("Theme switcher not found");

  const handleClick = () => toggleThemeWithTransition(switcher);

  switcher.addEventListener("click", handleClick);
  return () => switcher.removeEventListener("click", handleClick);
};
