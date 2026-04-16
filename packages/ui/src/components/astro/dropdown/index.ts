/** biome-ignore-all lint/performance/noBarrelFile: folder index is the public Astro component API and now owns the local styles. */
import { cva, type VariantProps } from "class-variance-authority";
import DropdownComponent from "./Dropdown.astro";
import DropdownContentComponent from "./DropdownContent.astro";
import DropdownItemComponent from "./DropdownItem.astro";
import DropdownLabelComponent from "./DropdownLabel.astro";
import DropdownSeparatorComponent from "./DropdownSeparator.astro";
import DropdownShortcutComponent from "./DropdownShortcut.astro";
import DropdownSubComponent from "./DropdownSub.astro";
import DropdownSubContentComponent from "./DropdownSubContent.astro";
import DropdownSubTriggerComponent from "./DropdownSubTrigger.astro";
import DropdownTriggerComponent from "./DropdownTrigger.astro";

export const dropdown = cva(["starwind-dropdown", "relative"]);

export const dropdownContent = cva(
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
);

export const dropdownItem = cva(
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
);

export const dropdownLabel = cva(["px-2 py-1.5 font-medium text-muted-foreground text-sm"], {
  variants: {
    inset: {
      true: "pl-8",
    },
  },
  defaultVariants: {
    inset: false,
  },
});

export const dropdownSeparator = cva("-mx-1 my-1 h-px bg-border");
export const dropdownShortcut = cva(
  "ml-auto text-muted-foreground text-sm tracking-widest transition-colors group-focus/dropdown-item:text-accent-foreground"
);
export const dropdownSub = cva(["starwind-dropdown-sub", "relative"]);
export const dropdownSubContent = cva("starwind-dropdown-sub-content");
export const dropdownSubTrigger = cva("starwind-dropdown-sub-trigger");
export const dropdownSubTriggerIcon = cva("icon-[lucide--chevron-right] ml-auto size-4");
export const dropdownTrigger = cva([
  "starwind-dropdown-trigger",
  "inline-flex items-center justify-center",
  "outline-none transition-[color,box-shadow] focus-visible:ring-3 focus-visible:ring-outline/50",
  "disabled:pointer-events-none",
]);
export const dropdownTriggerAsChild = cva("starwind-dropdown-trigger");

export type DropdownContentStyles = VariantProps<typeof dropdownContent>;
export type DropdownItemStyles = VariantProps<typeof dropdownItem>;
export type DropdownLabelStyles = VariantProps<typeof dropdownLabel>;

const DropdownVariants = {
  dropdown,
  dropdownContent,
  dropdownItem,
  dropdownLabel,
  dropdownSeparator,
  dropdownShortcut,
  dropdownSub,
  dropdownSubContent,
  dropdownSubTrigger,
  dropdownSubTriggerIcon,
  dropdownTrigger,
  dropdownTriggerAsChild,
};

export { default as Dropdown } from "./Dropdown.astro";
export { default as DropdownContent } from "./DropdownContent.astro";
export { default as DropdownItem } from "./DropdownItem.astro";
export { default as DropdownLabel } from "./DropdownLabel.astro";
export { default as DropdownSeparator } from "./DropdownSeparator.astro";
export { default as DropdownShortcut } from "./DropdownShortcut.astro";
export { default as DropdownSub } from "./DropdownSub.astro";
export { default as DropdownSubContent } from "./DropdownSubContent.astro";
export { default as DropdownSubTrigger } from "./DropdownSubTrigger.astro";
export { default as DropdownTrigger } from "./DropdownTrigger.astro";
export { DropdownVariants };

export default {
  get Root() {
    return DropdownComponent;
  },
  get Trigger() {
    return DropdownTriggerComponent;
  },
  get Content() {
    return DropdownContentComponent;
  },
  get Item() {
    return DropdownItemComponent;
  },
  get Label() {
    return DropdownLabelComponent;
  },
  get Separator() {
    return DropdownSeparatorComponent;
  },
  get Shortcut() {
    return DropdownShortcutComponent;
  },
  get Sub() {
    return DropdownSubComponent;
  },
  get SubTrigger() {
    return DropdownSubTriggerComponent;
  },
  get SubContent() {
    return DropdownSubContentComponent;
  },
};
