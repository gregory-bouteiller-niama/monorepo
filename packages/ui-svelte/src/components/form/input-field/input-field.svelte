<script lang="ts" module>
  export type InputFieldProps = { label: string; type: string };
</script>

<script lang="ts">
  import { Field } from "@niama/ui-svelte/form/field";
  import { useFieldContext } from "@niama/ui-svelte/hooks/form-context";
  import { Input } from "@niama/ui-svelte/ui/input";

  let { label, type }: InputFieldProps = $props();
  const { handleBlur, handleChange, name, state } = useFieldContext<string>();
</script>

<Field {label}>
  {#snippet children(isInvalid)}
    <Input
      aria-invalid={isInvalid}
      id={name}
      onblur={handleBlur}
      onchange={(e) => handleChange((e.target as HTMLInputElement).value)}
      placeholder={label}
      {type}
      value={state.value}
    />
  {/snippet}
</Field>
