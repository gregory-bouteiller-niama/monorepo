<script lang="ts">
  import { useFormContext } from "@niama/ui-svelte/hooks/form-context";
  import { Button } from "@niama/ui-svelte/ui/button";
  import { LoadingSwap } from "@niama/ui-svelte/ui/loading-swap";

  // MAIN ----------------------------------------------------------------------------------------------------------------------------------
  const form = useFormContext();
</script>

<form.Subscribe selector={(state) => state.isSubmitting}>
  {#snippet children(isSubmitting)}
    <Button class="cursor-pointer text-base" size="lg" type="submit"><LoadingSwap isLoading={isSubmitting}>Envoyer</LoadingSwap></Button>
  {/snippet}
</form.Subscribe>
