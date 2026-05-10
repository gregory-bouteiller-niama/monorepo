<script lang="ts" module>
  import type { Snippet } from "svelte";
  export type FieldProps = { children: Snippet<[boolean]>; label: string };
</script>

<script lang="ts">
  import { FIELD } from "@niama/ui/form/field";
  import { useFieldContext } from "@niama/ui-svelte/hooks/form-context";
  import { FieldLabel, Field as FieldNative } from "@niama/ui-svelte/ui/field";
  import FieldError from "./field-error.svelte";

  let { children, label }: FieldProps = $props();

  const { form, name, state } = useFieldContext<string>();
  const isInvalid = $derived((form.state.submissionAttempts > 0 || state.meta.isBlurred) && !state.meta.isValid);
</script>

<FieldNative class={FIELD.field()} data-invalid={isInvalid}>
  <FieldLabel class={FIELD.label()} for={name}> {label} </FieldLabel>
  {@render children?.(isInvalid)}
  <FieldError errors={state.meta.errors} {isInvalid} />
</FieldNative>
