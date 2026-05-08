import { type Disciplines, readDisciplineBySlug } from "@niama/domain/functions/disciplines";
import { cn } from "@niama/ui/lib/utils";
import { DISCIPLINES_BADGE } from "@niama/ui/shared/disciplines/badge";
import { Badge, type BadgeProps } from "../badge";

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
