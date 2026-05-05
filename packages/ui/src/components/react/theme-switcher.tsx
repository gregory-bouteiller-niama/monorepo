import { Button } from "@niama/ui/react/button";
import { themeStore, toggleThemeWithTransition } from "@niama/ui/shared/theme";
import { getThemeSwitcherLabel, THEME_SWITCHER } from "@niama/ui/shared/theme-switcher";
import { useSelector } from "@tanstack/react-store";
import { useRef } from "react";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function ThemeSwitcher() {
  const ref = useRef<HTMLButtonElement>(null);
  const theme = useSelector(themeStore);
  const label = getThemeSwitcherLabel(theme);

  const handleClick = () => toggleThemeWithTransition(ref.current);

  return (
    <Button
      aria-label={label}
      aria-pressed={theme === "dark"}
      className={THEME_SWITCHER.base()}
      onClick={handleClick}
      ref={ref}
      size="icon"
      suppressHydrationWarning
      title={label}
      type="button"
      variant="outline"
    >
      <span className={THEME_SWITCHER.sun()} />
      <span className={THEME_SWITCHER.moon()} />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
