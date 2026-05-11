<script lang="ts">
  import type { ReadPublicLayoutProps } from "@niama/domain/functions/layouts";
  import { headerStore, selectStainStyle } from "@niama/ui/lib/stores/header";
  import { clearHovered, THE_HEADER } from "@niama/ui/the-header";
  import { ThemeSwitcher } from "@niama/ui-svelte/theme-switcher";
  import { Logo } from "@niama/ui-svelte/ui/logo";
  import { Section } from "@niama/ui-svelte/ui/section";
  import { Separator } from "@niama/ui-svelte/ui/separator";
  import { useSelector } from "@tanstack/svelte-store";
  import { page } from "$app/state";
  import HeaderBurger from "./the-header.burger.svelte";
  import HeaderNav from "./the-header.nav.svelte";

  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  let { navs }: Pick<ReadPublicLayoutProps, "navs"> = $props();

  // STATES --------------------------------------------------------------------------------------------------------------------------------
  const hash = $derived(page.url.hash);

  const stainStyle = useSelector(headerStore, (state) => {
    const style = selectStainStyle(state) as Partial<CSSStyleDeclaration> | undefined;
    return style ? `height:${style.height};opacity:${style.opacity};transform:${style.transform};width:${style.width};` : "opacity:0;";
  });

  // EFFECTS -------------------------------------------------------------------------------------------------------------------------------
  $effect(() => headerStore.actions.setActive(navs.find((nav) => `#${nav.hash}` === hash)?.hash));
</script>

<div class={THE_HEADER.wrapper()}>
  <header class={THE_HEADER.base()}>
    <a aria-label="Retour à l'accueil" class={THE_HEADER.logo()} href="/">
      <Logo showTitle={false} />
    </a>
    <div class={THE_HEADER.actions()}>
      <ThemeSwitcher />
      <HeaderBurger {navs} />
    </div>
  </header>
</div>
<Section class="flex justify-center" id="top-1">
  <a aria-label="Retour à l'accueil" class={THE_HEADER.logoMain()} href="/">
    <Logo class="w-full" />
  </a>
</Section>
<Separator class="self-center! h-6" orientation="vertical" />
<Section class={THE_HEADER.menu()} id="top-2">
  <nav aria-label="Navigation principale" class={THE_HEADER.nav()} onmouseleave={clearHovered}>
    <div aria-hidden="true" class={THE_HEADER.stain()} style={stainStyle.current}></div>
    {#each navs as nav (nav.key)}
      <HeaderNav {nav} />
    {/each}
  </nav>
</Section>
<Separator class="self-center! h-24" orientation="vertical" />
