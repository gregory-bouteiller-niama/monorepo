import { SEPARATOR } from "@niama/ui/shared/separator";
import { cn } from "@niama/ui/lib/utils";
import type { JSX } from "solid-js";

export function Separator(props: SeparatorProps) {
  const { class: className, orientation = "horizontal", ...rest } = props;
  return (
    <div
      class={cn(SEPARATOR.base(), className)}
      data-horizontal={orientation === "horizontal" ? "" : undefined}
      data-orientation={orientation}
      data-slot="separator"
      data-vertical={orientation === "vertical" ? "" : undefined}
      {...rest}
    />
  );
}

export type SeparatorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  orientation?: "horizontal" | "vertical";
};
