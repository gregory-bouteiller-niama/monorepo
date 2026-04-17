import { type Disciplines, readDisciplineBySlug } from "@niama/domain/functions/disciplines";
import { cn } from "@niama/ui/lib/utils";
import { Badge, type BadgeProps } from "@niama/ui/react/badge";
import { DISCIPLINES_BADGE } from "@niama/ui/shared/disciplines/badge";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const DisciplinesBadge = ({ className, slug, ...props }: DisciplinesBadgeProps) => {
  const { title } = readDisciplineBySlug(slug);
  return (
    <Badge {...props} className={cn(DISCIPLINES_BADGE, className)} data-discipline={slug}>
      {title}
    </Badge>
  );
};
type DisciplinesBadgeProps = BadgeProps & { slug: Disciplines["Entity"]["slug"] };
