/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { default as CardAction, type Props as CardActionProps } from "./action.astro";
export { default as Card, type Props as CardProps } from "./card.astro";
export { default as CardContent, type Props as CardContentProps } from "./content.astro";
export { default as CardDescription, type Props as CardDescriptionProps } from "./description.astro";
export { default as CardFooter, type Props as CardFooterProps } from "./footer.astro";
export { default as CardHeader, type Props as CardHeaderProps } from "./header.astro";
export { CARD, type CardStyles } from "./styles";
export { default as CardTitle, type Props as CardTitleProps } from "./title.astro";
