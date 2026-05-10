<script lang="ts" module>
  export type FieldErrorProps = { errors: { message?: string }[]; isInvalid: boolean };
</script>

<script lang="ts">
  import { FIELD } from "@niama/ui/form/field";
  import { FieldError as FieldErrorNative } from "@niama/ui-svelte/ui/field";

  let { errors, isInvalid }: FieldErrorProps = $props();
</script>

<FieldErrorNative class={FIELD.error({ isInvalid })} {errors}>
  <span class={FIELD.errorIcon()}></span>
  {errors[0]?.message}
</FieldErrorNative>
