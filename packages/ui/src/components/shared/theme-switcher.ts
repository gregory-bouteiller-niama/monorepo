import { cva } from "class-variance-authority";
import { type AppTheme, themeStore, toggleThemeWithTransition } from "./theme";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const THEME_SWITCHER = {
  base: cva("cursor-pointer"),
  moon: cva(`icon-[lucide--moon] absolute size-4 rotate-90 scale-0 transition-all 
		dark:rotate-0 dark:scale-100`),
  sun: cva(`icon-[lucide--sun] size-4 rotate-0 scale-100 transition-all 
		dark:-rotate-90 dark:scale-0`),
} as const;

// LABELS ----------------------------------------------------------------------------------------------------------------------------------
export const DEFAULT_THEME_SWITCHER_LABEL = "Changer le thème";
export const getThemeSwitcherLabel = (theme: AppTheme) => (theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre");

// UTILS -----------------------------------------------------------------------------------------------------------------------------------
export const initializeThemeSwitcher = (switcher: HTMLElement) => {
  const syncThemeSwitcher = (theme: AppTheme) => {
    const label = getThemeSwitcherLabel(theme);
    switcher.setAttribute("aria-label", label);
    switcher.setAttribute("aria-pressed", (theme === "dark").toString());
    switcher.setAttribute("title", label);
  };

  syncThemeSwitcher(themeStore.get());
  const { unsubscribe } = themeStore.subscribe(syncThemeSwitcher);

  const handleClick = () => toggleThemeWithTransition(switcher);
  switcher.addEventListener("click", handleClick);

  return () => {
    unsubscribe();
    switcher.removeEventListener("click", handleClick);
  };
};
