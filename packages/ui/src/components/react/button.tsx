import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { BUTTON, type ButtonStyles } from "@niama/ui/styles/button.ts";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Button({ className, variant = "default", size = "default", ...props }: ButtonProps) {
  return <ButtonPrimitive className={BUTTON({ className, size, variant })} data-slot="button" {...props} />;
}
export type ButtonProps = Omit<ButtonPrimitive.Props, "className"> & ButtonStyles & { className?: string };
