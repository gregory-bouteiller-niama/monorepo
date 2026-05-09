import { SECTION } from "@niama/ui/section";
import { cn } from "@niama/ui-react/lib/utils";
import { Separator } from "@niama/ui-react/ui/separator";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Section({ children, className, description, id, title, withSeparator, ...props }: SectionProps) {
  return (
    <section className={cn(SECTION.base(), className)} data-section id={id} {...props}>
      {withSeparator && <Separator className={SECTION.separator()} orientation="vertical" />}
      {title && <h2 className={SECTION.title()}>{title}</h2>}
      {description && <p className={SECTION.description()}>{description}</p>}
      {children}
    </section>
  );
}
export type SectionProps = React.ComponentProps<"section"> & { description?: string; id: string; title?: string; withSeparator?: boolean };
