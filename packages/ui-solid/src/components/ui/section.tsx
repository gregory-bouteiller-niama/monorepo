import { SECTION } from "@niama/ui/section";
import { cn } from "@niama/ui-solid/lib/utils";
import { Separator } from "@niama/ui-solid/ui/separator";
import { type ComponentProps, Show, splitProps } from "solid-js";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Section(props: SectionProps) {
  const [local, rest] = splitProps(props, ["children", "class", "description", "id", "title", "withSeparator"]);

  return (
    <section class={cn(SECTION.base(), local.class)} data-section id={local.id} {...rest}>
      <Show when={local.withSeparator}>
        <Separator class={SECTION.separator()} orientation="vertical" />
      </Show>
      <Show when={local.title}>
        <h2 class={SECTION.title()}>{local.title}</h2>
      </Show>
      <Show when={local.description}>
        <p class={SECTION.description()}>{local.description}</p>
      </Show>
      {local.children}
    </section>
  );
}
export type SectionProps = ComponentProps<"section"> & { description?: string; id: string; title?: string; withSeparator?: boolean };
