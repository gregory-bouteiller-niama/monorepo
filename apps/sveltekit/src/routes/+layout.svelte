<script lang="ts">
  import { createStructuredData, SEO } from "@niama/domain/functions/site";
  import { bindGlows } from "@niama/ui/glow";
  import { PUBLIC_LAYOUT } from "@niama/ui/public-layout";
  import { initialize } from "@niama/ui/root-layout";
  import { themeScript } from "@niama/ui/theme";
  import { Sky } from "@niama/ui-svelte/sky";
  import { Button } from "@niama/ui-svelte/ui/button";
  import { Toaster } from "@niama/ui-svelte/ui/sonner";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg";
  import TheFooter from "./the-footer.svelte";
  import TheHeader from "./the-header.svelte";
  import "../styles.css";

  let { children, data } = $props();
  const structuredData = JSON.stringify(createStructuredData());
  const pageTitle = $derived.by(() => (page.data as { title?: string }).title ?? SEO.defaultTitle);
  const pageDescription = $derived.by(() => (page.data as { description?: string }).description ?? SEO.defaultDescription);
  const pageRobots = $derived.by(() => (page.data as { robots?: string }).robots ?? "index, follow");
  const skipTo = $derived.by(() => (page.data as { skipTo?: string }).skipTo ?? "#main");
  const canonicalUrl = $derived.by(() => new URL(page.url.pathname, SEO.url).toString());

  // onMount(() => {
  //   const cleanLayout = initialize();
  //   const glowCleaners = bindGlows();

  //   return () => {
  //     cleanLayout();
  //     for (const cleanGlow of glowCleaners) cleanGlow();
  //   };
  // });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta content={pageDescription} name="description">
  <meta content="accompagnants, équilibre, alignement" name="keywords">
  <meta content={pageRobots} name="robots">
  <meta content={SEO.name} property="og:site_name">
  <meta content={SEO.locale} property="og:locale">
  <meta content={pageTitle} property="og:title">
  <meta content={pageDescription} property="og:description">
  <meta content="website" property="og:type">
  <meta content={canonicalUrl} property="og:url">
  <meta content="summary" name="twitter:card">
  <meta content={pageTitle} name="twitter:title">
  <meta content={pageDescription} name="twitter:description">
  <link href={canonicalUrl} rel="canonical">
  <link href={favicon} rel="icon">
  <script type="application/ld+json">{structuredData}</script>
  {@html `<script>${themeScript}</script>`}
</svelte:head>

<Button class={PUBLIC_LAYOUT.skipLink()} href={skipTo} variant="outline">Aller au contenu principal</Button>
<TheHeader navs={data.navs} />
<Sky class="fixed inset-0" />
<main id="main" tabindex="-1">
  {@render children()}
</main>
<TheFooter socials={data.socials} />
<Toaster position="bottom-center" richColors />
