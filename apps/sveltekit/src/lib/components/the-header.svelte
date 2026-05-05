<script lang="ts">
  import type { ReadPublicLayoutProps } from "@niama/domain/functions/layouts";
  import { headerStore, selectStainStyle } from "@niama/ui/lib/stores/header";
  import { clearHovered, observeNavLink, THE_HEADER } from "@niama/ui/shared/the-header";
  import { Button } from "@niama/ui/svelte/button";
  import { Logo } from "@niama/ui/svelte/logo";
  import { Section } from "@niama/ui/svelte/section";
  import { Separator } from "@niama/ui/svelte/separator";
  import { ThemeSwitcher } from "@niama/ui/svelte/theme-switcher";
  import { useStore as readStore } from "@tanstack/svelte-store";
  import { onMount } from "svelte";

  let { navs }: Pick<ReadPublicLayoutProps, "navs"> = $props();

  let currentHash = $state("");
  let isMenuOpen = $state(false);

  const stainStyle = readStore(headerStore, selectStainStyle);

  const hoverNav = (hash: string) => {
    headerStore.actions.setHovered(hash);
  };

  const styleFromBounds = (style?: Partial<CSSStyleDeclaration>) =>
    style ? `height:${style.height};opacity:${style.opacity};transform:${style.transform};width:${style.width};` : "opacity:0;";

  const stainInlineStyle = $derived(styleFromBounds(stainStyle.current));

  const syncHash = () => {
    const hash = window.location.hash.replace("#", "");
    currentHash = hash === "top" ? "" : hash;
    headerStore.actions.setActive(currentHash || undefined);
    isMenuOpen = false;
  };

  onMount(() => {
    const links = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-link]"));
    const cleaners = links.flatMap((link) => {
      const hash = link.dataset.navLink;
      return hash ? [observeNavLink(hash, link)] : [];
    });

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      for (const clean of cleaners) clean();
    };
  });
</script>

<div class={THE_HEADER.wrapper()}>
  <header class={THE_HEADER.base()}>
    <a aria-label="Retour à l'accueil" class={THE_HEADER.logo()} href="/#top"> <Logo showTitle={false} /> </a>

    <div class={THE_HEADER.actions()}>
      <ThemeSwitcher />
      <Button
        aria-expanded={isMenuOpen}
        aria-label="Menu"
        class={THE_HEADER.burger()}
        onclick={() => {
					isMenuOpen = !isMenuOpen;
				}}
        size="icon"
        variant="outline"
      >
        <span class={THE_HEADER.burgerIcon()}></span>
      </Button>
    </div>
  </header>

  {#if isMenuOpen}
    <nav class={`${THE_HEADER.burgerContent()} absolute top-full right-0 mt-2 flex flex-col gap-2 sm:hidden`}>
      {#each navs as nav (nav.key)}
        <Button class={THE_HEADER.burgerItem()} href={`${nav.to}#${nav.hash}`} onclick={() => (isMenuOpen = false)} variant="ghost">
          {nav.text}
        </Button>
      {/each}
    </nav>
  {/if}
</div>

<Section class="flex justify-center" id="top-1">
  <a aria-label="Retour à l'accueil" class={THE_HEADER.logoMain()} href="/#top"> <Logo class="w-full" /> </a>
</Section>
<Separator class="self-center! h-6" orientation="vertical" />
<Section class={THE_HEADER.menu()} id="top-2">
  <nav class={THE_HEADER.nav()} onmouseleave={clearHovered}>
    <div aria-hidden="true" class={THE_HEADER.stain()} data-nav-stain style={stainInlineStyle}></div>
    {#each navs as nav (nav.key)}
      <Button
        aria-current={currentHash === nav.hash ? "page" : undefined}
        class={THE_HEADER.navLink()}
        data-nav-link={nav.hash}
        href={`${nav.to}#${nav.hash}`}
        onclick={() => {
					isMenuOpen = false;
				}}
        onmouseenter={() => hoverNav(nav.hash)}
        variant="ghost"
      >
        <span class={THE_HEADER.stainContent()}>{nav.text}</span>
      </Button>
    {/each}
  </nav>
</Section>
<Separator class="self-center! h-24" orientation="vertical" />
