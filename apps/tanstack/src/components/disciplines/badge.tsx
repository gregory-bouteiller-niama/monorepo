import { type Disciplines, readDisciplineBySlug } from "@niama/domain/functions/disciplines";
import { Badge, type BadgeProps } from "@niama/ui/react/badge";
import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const DISCIPLINES_BADGE = tv({
	base: "font-normal text-sm",
	variants: { discipline: { anima: "bg-anima", animus: "bg-animus", yogart: "bg-yogart" } },
});

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const DisciplinesBadge = ({ className, slug, ...props }: DisciplinesBadgeProps) => {
	const { title } = readDisciplineBySlug(slug);
	return (
		<Badge {...props} className={DISCIPLINES_BADGE({ discipline: slug, className })}>
			{title}
		</Badge>
	);
};
type DisciplinesBadgeProps = BadgeProps & { slug: Disciplines["Entity"]["slug"] };
