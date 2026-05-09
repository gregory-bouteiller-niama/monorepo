import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@niama/ui/lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const CARD = {
  base: cva(`group/card flex flex-col gap-6 overflow-hidden rounded-2xl bg-card py-6 text-card-foreground text-sm ring-1 ring-foreground/10 
		has-[>img:first-child]:pt-0 
		data-[size=sm]:gap-4 data-[size=sm]:py-4 
		*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl`),
  header: cva(`group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-xl px-6 
		has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] 
		group-data-[size=sm]/card:px-4 
		[.border-b]:pb-6 
		group-data-[size=sm]/card:[.border-b]:pb-4`),
  title: cva("font-heading font-medium text-base"),
  description: cva("text-muted-foreground text-sm"),
  action: cva("col-start-2 row-span-2 row-start-1 self-start justify-self-end"),
  content: cva(`px-6 
		group-data-[size=sm]/card:px-4`),
  footer: cva(`flex items-center rounded-b-xl px-6 
		group-data-[size=sm]/card:px-4 
		[.border-t]:pt-6 
		group-data-[size=sm]/card:[.border-t]:pt-4`),
} as const;

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Card({ className, size = "default", ...props }: CardProps) {
  return <div className={cn(CARD.base(), className)} data-size={size} data-slot="card" {...props} />;
}
export type CardProps = React.ComponentProps<"div"> & { size?: "default" | "sm" };

// ACTION ----------------------------------------------------------------------------------------------------------------------------------
export function CardAction({ className, ...props }: CardActionProps) {
  return <div className={cn(CARD.action(), className)} data-slot="card-action" {...props} />;
}
export type CardActionProps = React.ComponentProps<"div">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={cn(CARD.content(), className)} data-slot="card-content" {...props} />;
}
export type CardContentProps = React.ComponentProps<"div">;

// DESCRIPTION -----------------------------------------------------------------------------------------------------------------------------
export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return <div className={cn(CARD.description(), className)} data-slot="card-description" {...props} />;
}
export type CardDescriptionProps = React.ComponentProps<"div">;

// FOOTER ----------------------------------------------------------------------------------------------------------------------------------
export function CardFooter({ className, ...props }: CardFooterProps) {
  return <div className={cn(CARD.footer(), className)} data-slot="card-footer" {...props} />;
}
export type CardFooterProps = React.ComponentProps<"div">;

// HEADER ----------------------------------------------------------------------------------------------------------------------------------
export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={cn(CARD.header(), className)} data-slot="card-header" {...props} />;
}
export type CardHeaderProps = React.ComponentProps<"div">;

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export function CardTitle({ className, ...props }: CardTitleProps) {
  return <div className={cn(CARD.title(), className)} data-slot="card-title" {...props} />;
}
export type CardTitleProps = React.ComponentProps<"div">;
