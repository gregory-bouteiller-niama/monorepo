import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { SEPARATOR } from "@niama/ui/separator";
import { cn } from "@niama/ui-react/lib/utils";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Separator({ className, orientation = "horizontal", ...props }: SeparatorProps) {
  return <SeparatorPrimitive className={cn(SEPARATOR.base(), className)} data-slot="separator" orientation={orientation} {...props} />;
}
export type SeparatorProps = Omit<SeparatorPrimitive.Props, "className"> & { className?: string };
