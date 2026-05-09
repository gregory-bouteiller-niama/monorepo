import { cn } from "@niama/ui/lib/utils";
import { SECTION } from "@niama/ui/section";
import type { JSX } from "solid-js";
import { Separator } from "./separator";

export function Section(props: SectionProps) {
  const { children, class: className, description, id, title, withSeparator, ...rest } = props;

  return (
    <section class={cn(SECTION.base(), className)} data-section id={id} {...rest}>
      {withSeparator && <Separator class={SECTION.separator()} orientation="vertical" />}
      {title && <h2 class={SECTION.title()}>{title}</h2>}
      {description && <p class={SECTION.description()}>{description}</p>}
      {children}
    </section>
  );
}

export type SectionProps = {
  children?: JSX.Element;
  class?: string;
  description?: string;
  id: string;
  title?: string;
  withSeparator?: boolean;
};
