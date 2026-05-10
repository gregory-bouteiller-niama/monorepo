<script lang="ts">
  import { type Disciplines, readDisciplineBySlug } from "@niama/domain/functions/disciplines";
  import { DISCIPLINES_BADGE } from "@niama/ui/disciplines/badge";
  import { cn } from "@niama/ui-svelte/lib/utils";
  import { Badge } from "@niama/ui-svelte/ui/badge";

  let { class: className = "", slug }: { class?: string; slug: Disciplines["Entity"]["slug"] } = $props();

  const discipline = $derived(readDisciplineBySlug(slug));
</script>

<Badge class={cn(DISCIPLINES_BADGE(), className)} data-discipline={slug}>{discipline.title}</Badge>
