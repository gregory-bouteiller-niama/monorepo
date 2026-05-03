<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "../../lib/utils";
  import { SECTION } from "../shared/section";
  import { Separator } from "./separator";

  let {
    ref = $bindable(null),
    children,
    class: className = "",
    description,
    id,
    title,
    withSeparator = false,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    class?: string;
    description?: string;
    id: string;
    title?: string;
    withSeparator?: boolean;
  } = $props();
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
