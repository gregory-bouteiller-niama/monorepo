import { cva, type VariantProps } from "class-variance-authority";

export const ITEM = {
  base: cva(
    [
      "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm transition-colors",
      "[a]:transition-colors [a]:hover:bg-accent/50",
      "outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-outline/50",
    ],
    {
      variants: {
        variant: {
          default: "bg-transparent",
          outline: "border-border",
          muted: "bg-muted/50",
        },
        size: {
          default: "gap-4 p-4",
          sm: "gap-2.5 px-4 py-3",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  ),
  actions: cva("flex items-center gap-2"),
  content: cva("flex flex-1 flex-col gap-1.5 [&+[data-slot=item-content]]:flex-none"),
  description: cva([
    "line-clamp-2 text-balance font-normal text-muted-foreground leading-snug",
    "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
  ]),
  footer: cva("flex basis-full items-center justify-between gap-2"),
  group: cva("group/item-group flex flex-col"),
  header: cva("flex basis-full items-center justify-between gap-2"),
  media: cva(
    [
      "flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none",
      "group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start",
    ],
    {
      variants: {
        variant: {
          default: "bg-transparent",
          icon: "size-8 rounded-sm border bg-muted [&_svg:not([class*='size-'])]:size-4",
          image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  ),
  separator: cva("my-0"),
  title: cva("flex w-fit items-center gap-2 font-medium leading-snug"),
} as const;

export type ItemStyles = VariantProps<typeof ITEM.base>;
export type ItemMediaStyles = VariantProps<typeof ITEM.media>;
