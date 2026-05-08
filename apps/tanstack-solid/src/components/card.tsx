import { cva } from "class-variance-authority";
import { cn } from "@niama/ui/lib/utils";
import type { JSX } from "solid-js";

const CARD = {
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
  content: cva(`px-6 
    group-data-[size=sm]/card:px-4`),
} as const;

export function Card(props: CardProps) {
  const { class: className, size = "default", ...rest } = props;
  return <div class={cn(CARD.base(), className)} data-size={size} data-slot="card" {...rest} />;
}

export function CardHeader(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const { class: className, ...rest } = props;
  return <div class={cn(CARD.header(), className)} data-slot="card-header" {...rest} />;
}

export function CardTitle(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const { class: className, ...rest } = props;
  return <div class={cn(CARD.title(), className)} data-slot="card-title" {...rest} />;
}

export function CardDescription(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const { class: className, ...rest } = props;
  return <div class={cn(CARD.description(), className)} data-slot="card-description" {...rest} />;
}

export function CardContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const { class: className, ...rest } = props;
  return <div class={cn(CARD.content(), className)} data-slot="card-content" {...rest} />;
}

export type CardProps = JSX.HTMLAttributes<HTMLDivElement> & {
  class?: string;
  "data-back"?: boolean;
  "data-discipline"?: string;
  "data-glow"?: boolean;
  size?: "default" | "sm";
};
