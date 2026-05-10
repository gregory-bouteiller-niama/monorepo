<script lang="ts">
  import type { ReadLegalPageProps } from "@niama/domain/functions/pages";
  import { Button } from "@niama/ui-svelte/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@niama/ui-svelte/ui/card";
  import { Section } from "@niama/ui-svelte/ui/section";

  type LegalSectionProps = ReadLegalPageProps["legal"] | ReadLegalPageProps["privacy"];

  const LEGAL_SECTION = {
    base: "mx-auto max-w-7xl",
    content: "space-y-3 text-sm leading-7 md:text-base",
    container: "grid w-full gap-4 md:grid-cols-2",
    title: "font-bold text-3xl",
  } as const;

  let { section, withSeparator = true }: { section: LegalSectionProps; withSeparator?: boolean } = $props();
</script>

<Section class={LEGAL_SECTION.base} description={section.description} id={section.id} title={section.title} {withSeparator}>
  <div class={LEGAL_SECTION.container}>
    {#each section.cards as card, index (card.title)}
      <Card>
        <CardHeader> <CardTitle class={LEGAL_SECTION.title}>{card.title}</CardTitle> </CardHeader>
        <CardContent class={LEGAL_SECTION.content}>
          {#each card.content as paragraph, paragraphIndex (`${index}-${paragraphIndex}`)}
            {#if typeof paragraph === "string"}
              <p>{paragraph}</p>
            {:else}
              <p>
                {paragraph.prefix}
                <Button class="text-base" href={`mailto:${paragraph.email}`} size="xs" variant="link"> {paragraph.email} </Button>
                {"suffix" in paragraph ? paragraph.suffix : ""}
              </p>
            {/if}
          {/each}
        </CardContent>
      </Card>
    {/each}
  </div>
</Section>
