import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { tv } from "tailwind-variants";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	base: `shrink-0 bg-border 
  data-horizontal:h-px data-horizontal:w-full 
  data-vertical:w-px data-vertical:self-stretch`,
});
export const SEPARATOR = STYLES;

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
	return <SeparatorPrimitive className={SEPARATOR({ className })} data-slot="separator" orientation={orientation} {...props} />;
}
export type SeparatorProps = Omit<SeparatorPrimitive.Props, "className"> & { className?: string };
