<script lang="ts" module>
  import { cn, type WithElementRef } from "@niama/ui-svelte/lib/utils";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { tv, type VariantProps } from "tailwind-variants";

  export const itemVariants = tv({
    base: "group/item flex w-full flex-wrap items-center rounded-md border text-sm outline-none transition-colors duration-100 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
    variants: {
      variant: {
        default: "border-transparent",
        outline: "border-border",
        muted: "border-transparent bg-muted/50",
      },
      size: {
        default: "gap-3.5 px-4 py-3.5",
        sm: "gap-2.5 px-3 py-2.5",
        xs: "gap-2 in-data-[slot=dropdown-menu-content]:p-0 px-2.5 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  export type ItemSize = VariantProps<typeof itemVariants>["size"];
  export type ItemVariant = VariantProps<typeof itemVariants>["variant"];
  export type ItemProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    child?: Snippet<[{ props: Record<string, unknown> }]>;
    variant?: ItemVariant;
    size?: ItemSize;
  };
</script>

<script lang="ts">
  let { ref = $bindable(null), class: className, child, variant, size, ...restProps }: ItemProps = $props();

  const mergedProps = $derived({
    class: cn(itemVariants({ variant, size }), className),
    "data-slot": "item",
    "data-variant": variant,
    "data-size": size,
    ...restProps,
  });
</script>

{#if child}
  {@render child({ props: mergedProps })}
{:else}
  <div bind:this={ref} {...mergedProps}>
    {@render mergedProps.children?.()}
  </div>
{/if}
