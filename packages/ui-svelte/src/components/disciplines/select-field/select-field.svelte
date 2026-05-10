<script lang="ts">
  import { readAllDisciplines } from "@niama/domain/functions/disciplines";
  import { Field } from "@niama/ui-svelte/form/field";
  import { useFieldContext } from "@niama/ui-svelte/hooks/form-context";
  import { Select, SelectContent, SelectItem, SelectTrigger } from "@niama/ui-svelte/ui/select";

  const { handleChange, name, state } = useFieldContext<string>();
  const disciplines = readAllDisciplines();

  const items = [
    { label: "Voie non déterminée", value: "unknown" },
    { label: "Nouvelle voie", value: "new" },
    ...disciplines.map(({ slug: value, title: label }) => ({ label, value })),
  ];

  const triggerContent = $derived(items.find((f) => f.value === state.value)?.label ?? "Voie");
</script>

<Field label="Voie">
  {#snippet children(isInvalid)}
    <Select {items} {name} type="single" onValueChange={(value) => handleChange(value ?? "unknown")} value={state.value}>
      <SelectTrigger aria-invalid={isInvalid} class="min-w-[120px]" id={name}> {triggerContent} </SelectTrigger>
      <SelectContent>
        {#each items as { label, value }}
          <SelectItem key={value} {value}> {label} </SelectItem>
        {/each}
      </SelectContent>
    </Select>
  {/snippet}
</Field>
