import { BUTTON, type ButtonStyles } from "@niama/ui/button";
import { cn } from "@niama/ui/lib/utils";
import type { JSX } from "solid-js";

export function Button(props: ButtonProps) {
  const { class: className, ref, size = "default", type = "button", variant = "default", ...rest } = props;

  return <button class={cn(BUTTON({ size, variant }), className)} ref={ref} type={type} {...rest} />;
}

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonStyles & {
    class?: string;
    ref?: HTMLButtonElement | ((el: HTMLButtonElement) => void);
  };
