import { themeStore, toggleThemeWithTransition } from "@niama/ui/theme";
import { getThemeSwitcherLabel, THEME_SWITCHER } from "@niama/ui/theme-switcher";
import { createSignal, createTrackedEffect } from "solid-js";
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
      aria-label={getThemeSwitcherLabel(theme())}
      aria-pressed={theme() === "dark" ? "true" : "false"}
      class={THEME_SWITCHER.base()}
      onClick={() => toggleThemeWithTransition(buttonRef ?? null)}
      ref={(el) => {
        buttonRef = el;
      }}
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
