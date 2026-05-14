import { cva } from "class-variance-authority";

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
