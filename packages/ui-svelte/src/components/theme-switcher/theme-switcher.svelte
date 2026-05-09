<script lang="ts">
  import { themeStore, toggleThemeWithTransition } from "@niama/ui/theme";
  import { getThemeSwitcherLabel, THEME_SWITCHER } from "@niama/ui/theme-switcher";
  import { Button } from "@niama/ui-svelte/ui/button";
  import { useSelector as readStore } from "@tanstack/svelte-store";

  let ref = $state<HTMLButtonElement | null>(null);

  const theme = readStore(themeStore);
  const label = $derived(getThemeSwitcherLabel(theme.current));
</script>

<Button
  aria-label={label}
  aria-pressed={theme.current === "dark"}
  bind:ref
  class={THEME_SWITCHER.base()}
  onclick={() => toggleThemeWithTransition(ref)}
  size="icon"
  title={label}
  type="button"
  variant="outline"
>
  <span class={THEME_SWITCHER.sun()}></span>
  <span class={THEME_SWITCHER.moon()}></span>
  <span class="sr-only">{label}</span>
</Button>
