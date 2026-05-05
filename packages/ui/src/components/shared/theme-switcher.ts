import { cva } from "class-variance-authority";
import type { AppTheme } from "./theme";

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
