/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva, type VariantProps } from "class-variance-authority";
export const TOAST = {
  description: cva("starwind-toast-description text-muted-foreground text-sm"),
  item: cva(
    "starwind-toast pointer-events-auto absolute inset-x-0 bottom-0 flex w-full origin-bottom flex-col gap-1 overflow-hidden rounded-lg border bg-popover bg-clip-padding p-4 pr-10 text-popover-foreground shadow-lg transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-limited:pointer-events-none data-limited:opacity-0",
    {
      variants: {
        variant: {
          default: "border-border",
          success: "border-success/80",
          error: "border-error/80",
          warning: "border-warning/80",
          info: "border-info/80",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  ),
  content: cva("starwind-toast-content grid gap-1 transition-opacity duration-200 data-behind:opacity-0 data-expanded:opacity-100"),
  close: cva(
    "starwind-toast-close absolute top-2 right-2 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:text-foreground hover:opacity-100 focus-visible:outline-none focus-visible:ring-2"
  ),
  closeIcon: cva("icon-[tabler--x] size-4"),
  title: cva("starwind-toast-title flex items-center gap-1 font-semibold text-sm [&_svg]:size-4", {
    variants: {
      variant: {
        default: "",
        success: "[&_svg]:text-success",
        error: "[&_svg]:text-error",
        warning: "[&_svg]:text-warning",
        info: "[&_svg]:text-info",
        loading: "[&_svg]:text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }),
  titleIcons: {
    default: "",
    success: "icon-[tabler--circle-check] text-success",
    error: "icon-[tabler--circle-x]",
    warning: "icon-[tabler--alert-triangle]",
    info: "icon-[tabler--info-circle]",
    loading: "icon-[tabler--loader-2] animate-spin",
  } as const,
  viewport: cva([
    "starwind-toast-viewport fixed z-50 flex w-80 outline-none",
    "data-[position=bottom-center]:bottom-4 data-[position=bottom-center]:left-1/2 data-[position=bottom-center]:-translate-x-1/2",
    "data-[position=bottom-left]:bottom-4 data-[position=bottom-left]:left-4",
    "data-[position=bottom-right]:right-4 data-[position=bottom-right]:bottom-4",
    "data-[position=top-center]:top-4 data-[position=top-center]:left-1/2 data-[position=top-center]:-translate-x-1/2",
    "data-[position=top-left]:top-4 data-[position=top-left]:left-4",
    "data-[position=top-right]:top-4 data-[position=top-right]:right-4",
  ]),
} as const;

export type ToastItemStyles = VariantProps<typeof TOAST.item>;
export type ToastTitleStyles = VariantProps<typeof TOAST.title>;

export { default as ToastDescription, type Props as ToastDescriptionProps } from "./toast/ToastDescription.astro";
export { default as Toaster, type Props as ToasterProps } from "./toast/Toaster.astro";
export { default as ToastItem, type Props as ToastItemProps } from "./toast/ToastItem.astro";
export { default as ToastTemplate, type Props as ToastTemplateProps } from "./toast/ToastTemplate.astro";
export { default as ToastTitle, type Props as ToastTitleProps } from "./toast/ToastTitle.astro";
export type { PromiseOptions, PromiseStateOption, ToastOptions, Variant } from "./toast/toast-manager";
export { toast } from "./toast/toast-manager";
