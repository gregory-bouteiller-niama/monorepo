import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { BADGE, type BadgeStyles } from "@niama/ui/badge";
import { cn } from "@niama/ui-react/lib/utils";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Badge({ className, variant = "default", render, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">({ className: cn(BADGE({ variant }), className) }, props),
    render,
    state: { slot: "badge", variant },
  });
}
export type BadgeProps = useRender.ComponentProps<"span"> & BadgeStyles;
