import { type Disciplines, readDisciplineBySlug } from "@niama/domain/functions/disciplines";
import { DISCIPLINES_BADGE } from "@niama/ui/disciplines/badge";
import { cn } from "@niama/ui-react/lib/utils";
import { Badge, type BadgeProps } from "@niama/ui-react/ui/badge";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const DisciplinesBadge = ({ className, slug, ...props }: DisciplinesBadgeProps) => {
  const { title } = readDisciplineBySlug(slug);
  return (
    <Badge {...props} className={cn(DISCIPLINES_BADGE(), className)} data-discipline={slug}>
      {title}
    </Badge>
  );
};
type DisciplinesBadgeProps = BadgeProps & { slug: Disciplines["Entity"]["slug"] };
