/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
export { TOAST, type ToastItemStyles, type ToastTitleStyles } from "./toast/styles";

export { default as ToastDescription, type Props as ToastDescriptionProps } from "./toast/description.astro";
export { default as ToastItem, type Props as ToastItemProps } from "./toast/item.astro";
export { default as ToastTemplate, type Props as ToastTemplateProps } from "./toast/template.astro";
export { default as ToastTitle, type Props as ToastTitleProps } from "./toast/title.astro";
export { default as Toaster, type Props as ToasterProps } from "./toast/Toaster.astro";
export type { PromiseOptions, PromiseStateOption, ToastOptions, Variant } from "./toast/utils";
export { toast } from "./toast/utils";
