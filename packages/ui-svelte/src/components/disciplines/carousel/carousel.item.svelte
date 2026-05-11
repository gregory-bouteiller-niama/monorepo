<script lang="ts" module>
  import type { Disciplines } from "@niama/domain/functions/disciplines";
  import { DISCIPLINE } from "@niama/ui/disciplines/carousel";
  import { GLOW } from "@niama/ui/glow";
  import { glow } from "@niama/ui-svelte/hooks/glow";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Item, ItemContent, ItemDescription, ItemMedia, type ItemProps, ItemTitle } from "@niama/ui-svelte/ui/item";
  import { Logo } from "@niama/ui-svelte/ui/logo";

  export type DisciplinesCarouselItemProps = ItemProps & { item: Disciplines["Entity"] };
</script>

<script lang="ts">
  // PROPS ---------------------------------------------------------------------------------------------------------------------------------
  let { class: className, item, ...r }: DisciplinesCarouselItemProps = $props();
</script>

<Item class={cn(DISCIPLINE.base(), GLOW(), className)} data-discipline={item.slug} variant="outline" {...r} {@attach glow()}>
  <ItemMedia class={DISCIPLINE.media()}>
    <Logo class={DISCIPLINE.logo()} discipline={item} />
  </ItemMedia>
  <ItemContent class={DISCIPLINE.content()}>
    <ItemTitle class={DISCIPLINE.title()}>{item.title}</ItemTitle>
    {#each item.description as sentence (sentence)}
      <ItemDescription class={DISCIPLINE.description()}> {sentence} </ItemDescription>
    {/each}
  </ItemContent>
</Item>
