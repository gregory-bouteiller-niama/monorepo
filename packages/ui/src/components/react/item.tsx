import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Separator } from "./separator";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const ITEM = {
  base: cva(
    `group/item flex w-full flex-wrap items-center rounded-2xl border text-sm outline-none transition-colors duration-100 
		focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
		[a]:transition-colors [a]:hover:bg-muted`,
    {
      variants: {
        size: {
          default: "gap-3.5 px-4 py-3.5",
          sm: "gap-3.5 px-3.5 py-3",
          xs: "gap-2.5 in-data-[slot=dropdown-menu-content]:p-0 px-3 py-2.5",
        },
        variant: {
          default: "border-transparent",
          muted: "border-transparent bg-muted/50",
          outline: "border-border",
        },
      },
      defaultVariants: {
        size: "default",
        variant: "default",
      },
    }
  ),
  actions: cva("flex items-center gap-2"),
  content: cva(`flex flex-1 flex-col gap-1 
		group-data-[size=xs]/item:gap-0.5 
		[&+[data-slot=item-content]]:flex-none`),
  description: cva(`line-clamp-2 text-left font-normal text-muted-foreground text-sm 
		[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4`),
  footer: cva("flex basis-full items-center justify-between gap-2"),
  group: cva(`group/item-group flex w-full flex-col gap-4 
		has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2`),
  header: cva("flex basis-full items-center justify-between gap-2"),
  media: cva(
    `flex shrink-0 items-center justify-center gap-2 
		group-has-data-[slot=item-description]/item:translate-y-0.5 
		group-has-data-[slot=item-description]/item:self-start 
		[&_svg]:pointer-events-none`,
    {
      variants: {
        mediaVariant: {
          default: "bg-transparent",
          icon: "[&_svg:not([class*='size-'])]:size-4",
          image: `size-10 overflow-hidden rounded-lg 
						group-data-[size=sm]/item:size-8 
						group-data-[size=xs]/item:size-6 
						group-data-[size=xs]/item:rounded-md 
						[&_img]:size-full [&_img]:object-cover`,
        },
      },
      defaultVariants: {
        mediaVariant: "default",
      },
    }
  ),
  separator: cva("my-2"),
  title: cva("line-clamp-1 flex w-fit items-center gap-2 font-heading font-medium text-sm leading-snug underline-offset-4"),
} as const;

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Item({ className, size = "default", variant = "default", render, ...props }: ItemProps) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        className: cn(ITEM.base({ size, variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "item",
      size,
      variant,
    },
  });
}
export type ItemProps = useRender.ComponentProps<"div"> & Pick<ItemStyles, "size" | "variant">;

// ACTIONS ---------------------------------------------------------------------------------------------------------------------------------
export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <div className={cn(ITEM.actions(), className)} data-slot="item-actions" {...props} />;
}
export type ItemActionsProps = React.ComponentProps<"div">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function ItemContent({ className, ...props }: ItemContentProps) {
  return <div className={cn(ITEM.content(), className)} data-slot="item-content" {...props} />;
}
export type ItemContentProps = React.ComponentProps<"div">;

// DESCRIPTION -----------------------------------------------------------------------------------------------------------------------------
export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return <p className={cn(ITEM.description(), className)} data-slot="item-description" {...props} />;
}
export type ItemDescriptionProps = React.ComponentProps<"p">;

// FOOTER ----------------------------------------------------------------------------------------------------------------------------------
export function ItemFooter({ className, ...props }: ItemFooterProps) {
  return <div className={cn(ITEM.footer(), className)} data-slot="item-footer" {...props} />;
}
export type ItemFooterProps = React.ComponentProps<"div">;

// GROUP -----------------------------------------------------------------------------------------------------------------------------------
export function ItemGroup({ className, ...props }: ItemGroupProps) {
  // biome-ignore lint/a11y/useSemanticElements: ItemGroup is a generic wrapper and its children are not constrained to list items.
  return <div className={cn(ITEM.group(), className)} data-slot="item-group" role="list" {...props} />;
}
export type ItemGroupProps = React.ComponentProps<"div">;

// HEADER ----------------------------------------------------------------------------------------------------------------------------------
export function ItemHeader({ className, ...props }: ItemHeaderProps) {
  return <div className={cn(ITEM.header(), className)} data-slot="item-header" {...props} />;
}
export type ItemHeaderProps = React.ComponentProps<"div">;

// MEDIA -----------------------------------------------------------------------------------------------------------------------------------
export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return <div className={cn(ITEM.media({ mediaVariant: variant }), className)} data-slot="item-media" data-variant={variant} {...props} />;
}
export type ItemMediaProps = React.ComponentProps<"div"> & { variant?: ItemStyles["mediaVariant"] };

// SEPARATOR -------------------------------------------------------------------------------------------------------------------------------
export function ItemSeparator({ className, ...props }: ItemSeparatorProps) {
  return <Separator className={cn(ITEM.separator(), className)} data-slot="item-separator" orientation="horizontal" {...props} />;
}
export type ItemSeparatorProps = Omit<React.ComponentProps<typeof Separator>, "className"> & { className?: string };

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return <div className={cn(ITEM.title(), className)} data-slot="item-title" {...props} />;
}
export type ItemTitleProps = React.ComponentProps<"div">;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type ItemStyles = VariantProps<typeof ITEM.base> & VariantProps<typeof ITEM.media>;
