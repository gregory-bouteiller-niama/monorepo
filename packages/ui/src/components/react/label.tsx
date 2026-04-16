import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const LABEL = cva(`flex items-center gap-2 text-sm leading-none font-medium select-none 
	group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 
	peer-disabled:cursor-not-allowed peer-disabled:opacity-50`);

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Label({ className, ...props }: React.ComponentProps<"label">) {
  // biome-ignore lint/a11y/noLabelWithoutControl: false positive
  return <label className={cn(LABEL(), className)} data-slot="label" {...props} />;
}
