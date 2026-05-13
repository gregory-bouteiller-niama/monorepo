import { type Disciplines, readDisciplineBySlug } from "@niama/domain/functions/disciplines";
import { DISCIPLINES_BADGE } from "@niama/ui/disciplines/badge";
import { cn } from "@niama/ui-solid/lib/utils";
import { Badge, type BadgeProps } from "@niama/ui-solid/ui/badge";

export function DisciplinesBadge(props: DisciplinesBadgeProps) {
  const { class: className, slug, ...rest } = props;
  const { title } = readDisciplineBySlug(slug);

  return (
    <Badge class={cn(DISCIPLINES_BADGE(), className)} data-discipline={slug} {...rest}>
      {title}
    </Badge>
  );
}

type DisciplinesBadgeProps = BadgeProps & { slug: Disciplines["Entity"]["slug"] };
