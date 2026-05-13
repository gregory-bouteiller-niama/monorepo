import { headerStore, selectStainStyle } from "@niama/ui/lib/stores/header";
import { clearHovered, observeNavLink, THE_HEADER } from "@niama/ui/the-header";
import { Separator } from "@niama/ui-solid/ui/separator";
import { createSignal, createTrackedEffect } from "solid-js";
import { Logo } from "@/components/logo";
import { Section } from "@/components/section";
import { ThemeSwitcher } from "@/components/theme-switcher";
import type { ReadPublicLayoutProps } from "@/lib/layouts";

export function TheHeader(props: Pick<ReadPublicLayoutProps, "navs">) {
  const { navs } = props;
  const [stainStyle, setStainStyle] = createSignal(selectStainStyle(headerStore.state));

  createTrackedEffect(() => {
    if (typeof window === "undefined") return;

    const setActiveFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      headerStore.actions.setActive(navs.find((nav) => nav.hash === hash)?.hash);
    };

    const { unsubscribe } = headerStore.subscribe((state) => setStainStyle(selectStainStyle(state)));

    window.addEventListener("hashchange", setActiveFromHash);
    setActiveFromHash();

    return () => {
      unsubscribe();
      window.removeEventListener("hashchange", setActiveFromHash);
    };
  });

  return (
    <>
      <div class={THE_HEADER.wrapper()}>
        <header class={THE_HEADER.base()}>
          <a aria-label="Retour à l'accueil" class={THE_HEADER.logo()} href="/">
            <Logo showTitle={false} />
          </a>

          <div class={THE_HEADER.actions()}>
            <ThemeSwitcher />
            <HeaderBurger navs={navs} />
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
        <nav class={THE_HEADER.nav()} onMouseLeave={clearHovered}>
          <div aria-hidden="true" class={THE_HEADER.stain()} style={stainStyle()} />
          {navs.map((nav) => (
            <HeaderNav nav={nav} />
          ))}
        </nav>
      </Section>
      <Separator class="self-center! h-24" orientation="vertical" />
    </>
  );
}

function HeaderNav(props: HeaderNavProps) {
  const { nav } = props;
  let linkRef: HTMLAnchorElement | undefined;

  createTrackedEffect(() => {
    if (typeof window === "undefined") return;

    if (!linkRef) return;
    return observeNavLink(nav.hash, linkRef);
  });

  return (
    <a
      class={THE_HEADER.navLink()}
      href={`${nav.to}#${nav.hash}`}
      onMouseEnter={() => headerStore.actions.setHovered(nav.hash)}
      ref={linkRef}
    >
      <span class={THE_HEADER.stainContent()}>{nav.text}</span>
    </a>
  );
}

export type HeaderNavProps = { nav: ReadPublicLayoutProps["navs"][number] };

function HeaderBurger(props: Pick<ReadPublicLayoutProps, "navs">) {
  const { navs } = props;

  return (
    <details class="relative sm:hidden">
      <summary aria-label="Menu" class={`${THE_HEADER.burger()} list-none [&::-webkit-details-marker]:hidden`}>
        <span class={THE_HEADER.burgerIcon()} />
      </summary>
      <div class={THE_HEADER.burgerContent()}>
        <nav class="flex flex-col gap-1">
          {navs.map((nav) => (
            <a class={THE_HEADER.burgerItem()} href={`${nav.to}#${nav.hash}`}>
              {nav.text}
            </a>
          ))}
        </nav>
      </div>
    </details>
  );
}
