<script lang="ts">
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Separator } from "@niama/ui-svelte/ui/separator";
  import type { Separator as SeparatorPrimitive } from "bits-ui";

  let { ref = $bindable(null), class: className, ...restProps }: SeparatorPrimitive.RootProps = $props();
</script>

<Separator bind:ref data-slot="select-separator" class={cn("bg-border -mx-1 my-1 h-px pointer-events-none", className)} {...restProps} />
