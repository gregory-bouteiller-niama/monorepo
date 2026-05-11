<script lang="ts" module>
  import { BUTTON, type ButtonStyles } from "@niama/ui/button";
  import { cn, type WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> & WithElementRef<HTMLAnchorAttributes> & ButtonStyles;
</script>

<script lang="ts">
  let {
    class: className,
    variant = "default",
    size = "default",
    ref = $bindable(null),
    href,
    type = "button",
    disabled,
    children,
    ...restProps
  }: ButtonProps = $props();
</script>

{#if href}
  <a
    bind:this={ref}
    data-slot="button"
    class={cn(BUTTON({ variant, size }), className)}
    href={disabled ? undefined : href}
    aria-disabled={disabled}
    role={disabled ? "link" : undefined}
    tabindex={disabled ? -1 : undefined}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button bind:this={ref} data-slot="button" class={cn(BUTTON({ variant, size }), className)} {type} {disabled} {...restProps}>
    {@render children?.()}
  </button>
{/if}
