<script lang="ts" module>
	export type TextareaFieldProps = { label: string };
</script>

<script lang="ts">
  import { Field } from "@niama/ui-svelte/form/field";
  import { useFieldContext } from "@niama/ui-svelte/hooks/form-context";
  import { Textarea } from "@niama/ui-svelte/ui/textarea";

  let { handleBlur, handleChange, name, state } = useFieldContext<string>();
  let { label } = $props();
</script>

<Field {label}>
  {#snippet children(isInvalid)}
    <Textarea
      aria-invalid={isInvalid}
      id={name}
      onblur={handleBlur}
      onchange={(e) => handleChange((e.target as HTMLTextAreaElement).value)}
      placeholder={label}
      value={state.value}
    />
  {/snippet}
</Field>
