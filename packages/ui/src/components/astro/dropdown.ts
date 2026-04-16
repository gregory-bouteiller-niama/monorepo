/** biome-ignore-all lint/performance/noBarrelFile: flat Astro entrypoint exporting the component API and local styles. */
import { cva, type VariantProps } from "class-variance-authority";

export const DROPDOWN = {
  base: cva(["starwind-dropdown", "relative"]),
  content: cva(
    [
      "starwind-dropdown-content",
      "z-50 min-w-[9rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "fade-in zoom-in-95 data-[state=open]:animate-in",
      "fade-out zoom-out-95 data-[state=closed]:animate-out data-[state=closed]:fill-mode-forwards",
      "absolute will-change-transform",
    ],
    {
      variants: {
        side: {
          bottom: "slide-in-from-top-2 slide-out-to-top-2 top-full",
          top: "slide-in-from-bottom-2 slide-out-to-bottom-2 bottom-full",
          right: "slide-in-from-left-2 slide-out-to-left-2 top-0 left-full",
          left: "slide-in-from-right-2 slide-out-to-right-2 top-0 right-full",
        },
        align: {
          start: "",
          center: "",
          end: "",
        },
      },
      compoundVariants: [
        {
          side: ["top", "bottom"],
          align: "start",
          class: "slide-in-from-left-1 slide-out-to-left-1 left-0",
        },
        {
          side: ["top", "bottom"],
          align: "center",
          class: "left-1/2 -translate-x-1/2",
        },
        {
          side: ["top", "bottom"],
          align: "end",
          class: "slide-in-from-right-1 slide-out-to-right-1 right-0",
        },
        {
          side: ["left", "right"],
          align: "start",
          class: "top-0",
        },
        {
          side: ["left", "right"],
          align: "center",
          class: "top-1/2 -translate-y-1/2",
        },
        {
          side: ["left", "right"],
          align: "end",
          class: "bottom-0",
        },
      ],
      defaultVariants: {
        side: "bottom",
        align: "start",
      },
    }
  ),
  item: cva(
    [
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "group/dropdown-item [&>svg]:size-4 [&>svg]:shrink-0",
    ],
    {
      variants: {
        inset: {
          true: "pl-8",
        },
        disabled: {
          true: "pointer-events-none opacity-50",
        },
      },
      defaultVariants: {
        inset: false,
        disabled: false,
      },
    }
  ),
  label: cva(["px-2 py-1.5 font-medium text-muted-foreground text-sm"], {
    variants: {
      inset: {
        true: "pl-8",
      },
    },
    defaultVariants: {
      inset: false,
    },
  }),
  separator: cva("-mx-1 my-1 h-px bg-border"),
  shortcut: cva("ml-auto text-muted-foreground text-sm tracking-widest transition-colors group-focus/dropdown-item:text-accent-foreground"),
  sub: cva(["starwind-dropdown-sub", "relative"]),
  subContent: cva("starwind-dropdown-sub-content"),
  subTrigger: cva("starwind-dropdown-sub-trigger"),
  subTriggerIcon: cva("icon-[lucide--chevron-right] ml-auto size-4"),
  trigger: cva([
    "starwind-dropdown-trigger",
    "inline-flex items-center justify-center",
    "outline-none transition-[color,box-shadow] focus-visible:ring-3 focus-visible:ring-outline/50",
    "disabled:pointer-events-none",
  ]),
  triggerAsChild: cva("starwind-dropdown-trigger"),
} as const;

export type DropdownContentStyles = VariantProps<typeof DROPDOWN.content>;
export type DropdownItemStyles = VariantProps<typeof DROPDOWN.item>;
export type DropdownLabelStyles = VariantProps<typeof DROPDOWN.label>;

export { default as Dropdown, type Props as DropdownProps } from "./dropdown/Dropdown.astro";
export { default as DropdownContent, type Props as DropdownContentProps } from "./dropdown/DropdownContent.astro";
export { default as DropdownItem, type Props as DropdownItemProps } from "./dropdown/DropdownItem.astro";
export { default as DropdownLabel, type Props as DropdownLabelProps } from "./dropdown/DropdownLabel.astro";
export { default as DropdownSeparator, type Props as DropdownSeparatorProps } from "./dropdown/DropdownSeparator.astro";
export { default as DropdownShortcut, type Props as DropdownShortcutProps } from "./dropdown/DropdownShortcut.astro";
export { default as DropdownSub, type Props as DropdownSubProps } from "./dropdown/DropdownSub.astro";
export { default as DropdownSubContent, type Props as DropdownSubContentProps } from "./dropdown/DropdownSubContent.astro";
export { default as DropdownSubTrigger, type Props as DropdownSubTriggerProps } from "./dropdown/DropdownSubTrigger.astro";
export { default as DropdownTrigger, type Props as DropdownTriggerProps } from "./dropdown/DropdownTrigger.astro";
