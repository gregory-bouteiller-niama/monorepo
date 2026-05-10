<script lang="ts">
  import type { ReadPublicLayoutProps } from "@niama/domain/functions/layouts";
  import { THE_FOOTER } from "@niama/ui/the-footer";
  import { Button } from "@niama/ui-svelte/ui/button";

  let { socials }: Pick<ReadPublicLayoutProps, "socials"> = $props();
</script>

<footer class={THE_FOOTER.base()}>
  <Button class={THE_FOOTER.disclaimer()} href="/mentions-legales" variant="outline">Mentions Légales</Button>
  <div class={THE_FOOTER.socials()}>
    {#each socials as social (social.key)}
      <Button
        aria-label={social.label}
        class={THE_FOOTER.social()}
        href={social.href}
        rel="noopener"
        size="icon"
        target="_blank"
        variant="outline"
      >
        <span class={social.icon}></span>
      </Button>
    {/each}
  </div>
</footer>
