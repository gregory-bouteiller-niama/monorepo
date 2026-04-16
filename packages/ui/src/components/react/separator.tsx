import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const SEPARATOR = cva(`shrink-0 bg-border 
	data-horizontal:h-px data-horizontal:w-full 
	data-vertical:w-px data-vertical:self-stretch`);

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return <SeparatorPrimitive className={cn(SEPARATOR(), className)} data-slot="separator" orientation={orientation} {...props} />;
}
export type SeparatorProps = Omit<SeparatorPrimitive.Props, "className"> & { className?: string };
