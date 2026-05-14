import { type BadgeRootProps, Root } from "@kobalte/core/badge";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { BADGE, type BadgeStyles } from "@niama/ui/badge";
import { cn } from "@niama/ui-solid/lib/utils";
import { splitProps, type ValidComponent } from "solid-js";

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export const Badge = <T extends ValidComponent = "span">(props: BadgeProps<T>) => {
  const [local, others] = splitProps(props as BadgeProps, ["class", "variant"]);
  return <Root class={cn(BADGE({ variant: local.variant }), local.class)} data-slot="badge" data-variant={local.variant} {...others} />;
};
export type BadgeProps<T extends ValidComponent = "span"> = PolymorphicProps<T, BadgeRootProps<T>> & BadgeStyles;
