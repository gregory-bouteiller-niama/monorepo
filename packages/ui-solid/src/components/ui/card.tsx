import { CARD } from "@niama/ui/card";
import { cn } from "@niama/ui-solid/lib/utils";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export const Card = (props: CardProps) => {
  const mergedProps = mergeProps({ size: "default" } as const, props);
  const [local, others] = splitProps(mergedProps, ["class", "size"]);
  return <div class={cn(CARD.base(), "z-card", local.class)} data-size={local.size} data-slot="card" {...others} />;
};
export type CardProps = ComponentProps<"div"> & { size?: "default" | "sm" };

// ACTION ----------------------------------------------------------------------------------------------------------------------------------
export const CardAction = (props: CardActionProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn(CARD.action(), "z-card-action", local.class)} data-slot="card-action" {...others} />;
};
export type CardActionProps = ComponentProps<"div">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export const CardContent = (props: CardContentProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn(CARD.content(), "z-card-content", local.class)} data-slot="card-content" {...others} />;
};
export type CardContentProps = ComponentProps<"div">;

// DESCRIPTION -----------------------------------------------------------------------------------------------------------------------------
export const CardDescription = (props: CardDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn(CARD.description(), "z-card-description", local.class)} data-slot="card-description" {...others} />;
};
export type CardDescriptionProps = ComponentProps<"div">;

// FOOTER ---------------------------------------------------------------------------------------------------------------------------------
export const CardFooter = (props: CardFooterProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn(CARD.footer(), "z-card-footer", local.class)} data-slot="card-footer" {...others} />;
};
export type CardFooterProps = ComponentProps<"div">;

// HEADER ----------------------------------------------------------------------------------------------------------------------------------
export const CardHeader = (props: CardHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div class={cn(CARD.header(), "z-card-header", local.class)} data-slot="card-header" {...others} />;
};
export type CardHeaderProps = ComponentProps<"div">;

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export const CardTitle = (props: CardTitleProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <h3 class={cn(CARD.title(), "z-card-title", local.class)} data-slot="card-title" {...others} />;
};
export type CardTitleProps = ComponentProps<"div">;
