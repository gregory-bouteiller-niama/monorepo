<script lang="ts">
  import { SEPARATOR } from "@niama/ui/separator";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Separator as SeparatorPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    "data-slot": dataSlot = "separator",
    ...restProps
  }: SeparatorPrimitive.RootProps = $props();
</script>

<SeparatorPrimitive.Root bind:ref data-slot={dataSlot} class={cn(SEPARATOR.base(),  className)} {...restProps} />
