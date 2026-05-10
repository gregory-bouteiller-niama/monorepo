import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const FIELD = {
  error: cva(
    `flex origin-top items-center gap-2 overflow-hidden rounded-full font-normal bg-destructive px-2 text-destructive-foreground 
    transition-[max-height] duration-150 ease-in`,
    { variants: { isInvalid: { true: "max-h-10", false: "max-h-0" } } }
  ),
  errorIcon: cva("icon-[lucide--circle-alert] size-4 py-8"),
  field: cva("gap-2"),
  label: cva(""),
};
