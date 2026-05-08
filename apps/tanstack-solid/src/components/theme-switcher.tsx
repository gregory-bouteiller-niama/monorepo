import { createSignal, createTrackedEffect } from "solid-js";
import { themeStore, toggleThemeWithTransition } from "@niama/ui/shared/theme";
import { THEME_SWITCHER, getThemeSwitcherLabel } from "@niama/ui/shared/theme-switcher";
import { Button } from "./button";

export function ThemeSwitcher() {
  const [theme, setTheme] = createSignal(themeStore.state);
  let buttonRef: HTMLButtonElement | undefined;

  createTrackedEffect(() => {
    if (typeof window === "undefined") return;

    const { unsubscribe } = themeStore.subscribe((value) => setTheme(value));
    return unsubscribe;
  });

  return (
    <Button
      ref={(el) => {
        buttonRef = el;
      }}
      aria-label={getThemeSwitcherLabel(theme())}
      aria-pressed={theme() === "dark" ? "true" : "false"}
      class={THEME_SWITCHER.base()}
      onClick={() => toggleThemeWithTransition(buttonRef ?? null)}
      size="icon"
      title={getThemeSwitcherLabel(theme())}
      variant="outline"
    >
      <span class={THEME_SWITCHER.sun()} />
      <span class={THEME_SWITCHER.moon()} />
      <span class="sr-only">{getThemeSwitcherLabel(theme())}</span>
    </Button>
  );
}
