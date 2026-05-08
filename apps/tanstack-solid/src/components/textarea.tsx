import { cva } from "class-variance-authority";
import { cn } from "@niama/ui/lib/utils";
import type { JSX } from "solid-js";

const TEXTAREA = cva(`field-sizing-content flex min-h-16 w-full resize-none rounded-xl border border-input bg-input/30 px-3 py-3 text-base outline-none 
	transition-colors 
	placeholder:text-muted-foreground 
	focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
	disabled:cursor-not-allowed disabled:opacity-50 
	aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 
	md:text-sm 
	dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40`);

export function Textarea(props: TextareaProps) {
  const { class: className, ...rest } = props;
  return <textarea class={cn(TEXTAREA(), className)} data-slot="textarea" {...rest} />;
}

export type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  class?: string;
};
