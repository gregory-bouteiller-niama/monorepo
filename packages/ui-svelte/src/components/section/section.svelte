<script lang="ts" module>
  import type { WithElementRef } from "@niama/ui-svelte/utils";
  import type { HTMLAttributes } from "svelte/elements";

  export type SectionProps = WithElementRef<HTMLAttributes<HTMLElement>> & {
    class?: string;
    description?: string;
    id: string;
    title?: string;
    withSeparator?: boolean;
  };
</script>

<script lang="ts">
  import { SECTION } from "@niama/ui/section";
  import { Separator } from "@niama/ui-svelte/separator";
  import { cn } from "@niama/ui-svelte/utils";

  let {
    ref = $bindable(null),
    children,
    class: className = "",
    description,
    id,
    title,
    withSeparator = false,
    ...restProps
  }: SectionProps = $props();
</script>

<section bind:this={ref} data-section class={cn(SECTION.base({ className }))} {id} {...restProps}>
  {#if withSeparator}
    <Separator class={SECTION.separator()} orientation="vertical" />
  {/if}
  {#if title}
    <h2 class={SECTION.title()}>{title}</h2>
  {/if}
  {#if description}
    <p class={SECTION.description()}>{description}</p>
  {/if}
  {@render children?.()}
</section>
