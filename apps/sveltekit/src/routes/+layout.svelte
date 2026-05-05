<script lang="ts">
  import { createStructuredData, SEO } from "@niama/domain/functions/site";
  import { bindGlows } from "@niama/ui/shared/glow";
  import { initialize } from "@niama/ui/shared/root-layout";
  import { themeScript } from "@niama/ui/shared/theme";
  import { Toaster } from "@niama/ui/svelte/sonner";
  import { onMount } from "svelte";
  import favicon from "$lib/assets/favicon.svg";
  import Sky from "$lib/components/sky.svelte";
  import TheFooter from "$lib/components/the-footer.svelte";
  import TheHeader from "$lib/components/the-header.svelte";
  import "./layout.css";

  let { children, data } = $props();
  const structuredData = JSON.stringify(createStructuredData());

  onMount(() => {
    const cleanLayout = initialize();
    const glowCleaners = bindGlows();

    return () => {
      cleanLayout();
      for (const cleanGlow of glowCleaners) cleanGlow();
    };
  });
</script>

<svelte:head>
  <title>{SEO.defaultTitle}</title>
  <meta content={SEO.defaultDescription} name="description">
  <meta content="accompagnants, équilibre, alignement" name="keywords">
  <meta content="index, follow" name="robots">
  <link href={favicon} rel="icon">
  <script type="application/ld+json">{structuredData}</script>
  {@html `<script>${themeScript}</script>`}
</svelte:head>

<TheHeader navs={data.navs} />
<Sky class="fixed inset-0" />
{@render children()}
<TheFooter socials={data.socials} />
<Toaster position="bottom-center" richColors />
