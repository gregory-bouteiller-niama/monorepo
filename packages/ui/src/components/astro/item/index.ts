/** biome-ignore-all lint/performance/noBarrelFile: folder index is the public Astro component API and now owns the local styles. */
import { cva, type VariantProps } from "class-variance-authority";
import ItemComponent from "./Item.astro";
import ItemActionsComponent from "./ItemActions.astro";
import ItemContentComponent from "./ItemContent.astro";
import ItemDescriptionComponent from "./ItemDescription.astro";
import ItemFooterComponent from "./ItemFooter.astro";
import ItemGroupComponent from "./ItemGroup.astro";
import ItemHeaderComponent from "./ItemHeader.astro";
import ItemMediaComponent from "./ItemMedia.astro";
import ItemSeparatorComponent from "./ItemSeparator.astro";
import ItemTitleComponent from "./ItemTitle.astro";

export const item = cva(
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
);

export const itemActions = cva("flex items-center gap-2");
export const itemContent = cva("flex flex-1 flex-col gap-1.5 [&+[data-slot=item-content]]:flex-none");
export const itemDescription = cva([
  "line-clamp-2 text-balance font-normal text-muted-foreground leading-snug",
  "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
]);
export const itemFooter = cva("flex basis-full items-center justify-between gap-2");
export const itemGroup = cva("group/item-group flex flex-col");
export const itemHeader = cva("flex basis-full items-center justify-between gap-2");
export const itemMedia = cva(
  [
    "flex shrink-0 items-center justify-center gap-2 [&_svg]:pointer-events-none",
    "group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start",
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
);
export const itemSeparator = cva("my-0");
export const itemTitle = cva("flex w-fit items-center gap-2 font-medium leading-snug");

export type ItemStyles = VariantProps<typeof item>;
export type ItemMediaStyles = VariantProps<typeof itemMedia>;

const ItemVariants = {
  item,
  itemActions,
  itemContent,
  itemDescription,
  itemFooter,
  itemGroup,
  itemHeader,
  itemMedia,
  itemSeparator,
  itemTitle,
};

export { default as Item } from "./Item.astro";
export { default as ItemActions } from "./ItemActions.astro";
export { default as ItemContent } from "./ItemContent.astro";
export { default as ItemDescription } from "./ItemDescription.astro";
export { default as ItemFooter } from "./ItemFooter.astro";
export { default as ItemGroup } from "./ItemGroup.astro";
export { default as ItemHeader } from "./ItemHeader.astro";
export { default as ItemMedia } from "./ItemMedia.astro";
export { default as ItemSeparator } from "./ItemSeparator.astro";
export { default as ItemTitle } from "./ItemTitle.astro";
export { ItemVariants };

export default {
  get Root() {
    return ItemComponent;
  },
  get Actions() {
    return ItemActionsComponent;
  },
  get Content() {
    return ItemContentComponent;
  },
  get Description() {
    return ItemDescriptionComponent;
  },
  get Footer() {
    return ItemFooterComponent;
  },
  get Group() {
    return ItemGroupComponent;
  },
  get Header() {
    return ItemHeaderComponent;
  },
  get Media() {
    return ItemMediaComponent;
  },
  get Separator() {
    return ItemSeparatorComponent;
  },
  get Title() {
    return ItemTitleComponent;
  },
};
