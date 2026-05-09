/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */

export { default as CardAction, type Props as CardActionProps } from "./card/action.astro";
export { default as Card, type Props as CardProps } from "./card/card.astro";
export { default as CardContent, type Props as CardContentProps } from "./card/content.astro";
export { default as CardDescription, type Props as CardDescriptionProps } from "./card/description.astro";
export { default as CardFooter, type Props as CardFooterProps } from "./card/footer.astro";
export { default as CardHeader, type Props as CardHeaderProps } from "./card/header.astro";
export { CARD, type CardStyles } from "./card/styles";
export { default as CardTitle, type Props as CardTitleProps } from "./card/title.astro";
