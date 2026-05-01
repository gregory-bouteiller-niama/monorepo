import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@niama/ui/lib/utils";
import { BUTTON, type ButtonStyles } from "@niama/ui/shared/button";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return <ButtonPrimitive className={cn(BUTTON({ variant, size }), className)} data-slot="button" {...props} />;
}
export type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & ButtonStyles & { className?: string };
