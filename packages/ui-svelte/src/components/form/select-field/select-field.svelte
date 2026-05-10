<script lang="ts" module>
  export type SelectFieldProps = { defaultValue: string; items: { label: string; value: string }[]; label: string; placeholder: string };
</script>

<script lang="ts">
  import { Field } from "@niama/ui-svelte/form/field";
  import { useFieldContext } from "@niama/ui-svelte/hooks/form-context";
  import { Select, SelectContent, SelectItem, SelectTrigger } from "@niama/ui-svelte/ui/select";

  let { defaultValue, items, label, placeholder }: SelectFieldProps = $props();
  const { handleChange, name, state } = useFieldContext<string>();

  const triggerContent = $derived(items.find((f) => f.value === state.value)?.label ?? placeholder);
</script>

<Field {label}>
  {#snippet children(isInvalid)}
    <Select {items} {name} type="single" onValueChange={(v) => handleChange(v ?? defaultValue)} bind:value={state.value}>
      <SelectTrigger aria-invalid={isInvalid} class="min-w-[120px]" id={name}> {triggerContent} </SelectTrigger>
      <SelectContent>
        {#each items as { label, value }}
          <SelectItem key={value} {value}> {label} </SelectItem>
        {/each}
      </SelectContent>
    </Select>
  {/snippet}
</Field>
