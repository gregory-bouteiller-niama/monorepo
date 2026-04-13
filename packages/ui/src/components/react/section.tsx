import { SECTION } from "@niama/ui/styles/section";
import { Separator } from "./separator";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function Section({ children, className, description, id, title, withSeparator }: SectionProps) {
	return (
		<section data-section className={SECTION.base({ className })} id={id}>
			{withSeparator && <Separator className={SECTION.separator()} orientation="vertical" />}
			{title && <h2 className={SECTION.title()}>{title}</h2>}
			{description && <p className={SECTION.description()}>{description}</p>}
			{children}
		</section>
	);
}
export type SectionProps = React.ComponentProps<"section"> & { description?: string; id: string; title?: string; withSeparator?: boolean };
