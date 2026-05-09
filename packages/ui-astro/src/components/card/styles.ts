import { cva, type VariantProps } from "class-variance-authority";

export const CARD = {
  base: cva(
    [
      "group/card flex flex-col rounded-xl bg-card text-card-foreground ring-1 ring-border",
      "has-[>img:first-child]:pt-0 has-data-[slot=card-footer]:pb-0",
      "*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
    ],
    {
      variants: {
        size: {
          default: "gap-6 py-6",
          sm: "gap-4 py-4 text-sm",
        },
      },
      defaultVariants: {
        size: "default",
      },
    }
  ),
  action: cva("col-start-2 row-span-2 row-start-1 self-start justify-self-end"),
  content: cva("px-6 group-data-[size=sm]/card:px-4"),
  description: cva("text-base text-muted-foreground group-data-[size=sm]/card:text-sm"),
  footer: cva("flex items-center rounded-b-xl border-t bg-muted/50 p-6 group-data-[size=sm]/card:p-4"),
  header: cva([
    "@container/card-header grid auto-rows-min items-start gap-1 px-6 group-data-[size=sm]/card:px-4",
    "has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
  ]),
  title: cva("font-heading font-medium text-xl leading-snug group-data-[size=sm]/card:text-base"),
} as const;

export type CardStyles = VariantProps<typeof CARD.base>;
