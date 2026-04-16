/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva, type VariantProps } from "class-variance-authority";
import CardComponent from "./card/Card.astro";
import CardActionComponent from "./card/CardAction.astro";
import CardContentComponent from "./card/CardContent.astro";
import CardDescriptionComponent from "./card/CardDescription.astro";
import CardFooterComponent from "./card/CardFooter.astro";
import CardHeaderComponent from "./card/CardHeader.astro";
import CardTitleComponent from "./card/CardTitle.astro";

export const card = cva(
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
);

export const cardAction = cva("col-start-2 row-span-2 row-start-1 self-start justify-self-end");
export const cardContent = cva("px-6 group-data-[size=sm]/card:px-4");
export const cardDescription = cva("text-base text-muted-foreground group-data-[size=sm]/card:text-sm");
export const cardFooter = cva("flex items-center rounded-b-xl border-t bg-muted/50 p-6 group-data-[size=sm]/card:p-4");
export const cardHeader = cva([
  "@container/card-header grid auto-rows-min items-start gap-1 px-6 group-data-[size=sm]/card:px-4",
  "has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]",
]);
export const cardTitle = cva("font-heading font-medium text-xl leading-snug group-data-[size=sm]/card:text-base");

export type CardStyles = VariantProps<typeof card>;

const CardVariants = {
  card,
  cardAction,
  cardContent,
  cardDescription,
  cardFooter,
  cardHeader,
  cardTitle,
};

export { default as Card } from "./card/Card.astro";
export { default as CardAction } from "./card/CardAction.astro";
export { default as CardContent } from "./card/CardContent.astro";
export { default as CardDescription } from "./card/CardDescription.astro";
export { default as CardFooter } from "./card/CardFooter.astro";
export { default as CardHeader } from "./card/CardHeader.astro";
export { default as CardTitle } from "./card/CardTitle.astro";
export { CardVariants };

export default {
  get Root() {
    return CardComponent;
  },
  get Header() {
    return CardHeaderComponent;
  },
  get Footer() {
    return CardFooterComponent;
  },
  get Title() {
    return CardTitleComponent;
  },
  get Description() {
    return CardDescriptionComponent;
  },
  get Content() {
    return CardContentComponent;
  },
  get Action() {
    return CardActionComponent;
  },
};
