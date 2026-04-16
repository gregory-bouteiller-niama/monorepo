import { Select as SelectPrimitive } from "@base-ui/react/select";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const SELECT = {
  content: cva(`data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 
		data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 
		data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 
		data-open:fade-in-0 data-open:zoom-in-95 data-closed:fade-out-0 data-closed:zoom-out-95 
		relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) 
		overflow-y-auto overflow-x-hidden rounded-2xl bg-popover text-popover-foreground shadow-2xl ring-1 
		ring-foreground/5 duration-100 data-[align-trigger=true]:animate-none data-closed:animate-out data-open:animate-in`),
  group: cva("scroll-my-1 p-1"),
  item: cva(`relative flex w-full cursor-default select-none items-center gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm 
		outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground 
		data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 
		[&_svg]:pointer-events-none [&_svg]:shrink-0 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`),
  itemIndicator: cva("pointer-events-none absolute right-2 flex size-4 items-center justify-center"),
  itemText: cva("flex flex-1 shrink-0 gap-2 whitespace-nowrap"),
  label: cva("px-3 py-2.5 text-muted-foreground text-xs"),
  scrollDownButton: cva(`bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 
		[&_svg:not([class*='size-'])]:size-4`),
  scrollUpButton: cva(`top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 
		[&_svg:not([class*='size-'])]:size-4`),
  separator: cva("pointer-events-none -mx-1 my-1 h-px bg-border/50"),
  trigger: cva(`flex w-fit items-center justify-between gap-1.5 whitespace-nowrap rounded-4xl border border-input 
		bg-input/30 px-3 py-2 text-sm outline-none transition-colors 
		focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 
		disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive 
		aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground
		data-[size=default]:h-9 data-[size=sm]:h-8
		*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center 
		*:data-[slot=select-value]:gap-1.5 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 
		dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`),
  triggerIcon: cva("icon-[tabler--selector] pointer-events-none size-4 text-muted-foreground"),
  value: cva("flex flex-1 text-left"),
} as const;

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export const Select = SelectPrimitive.Root;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        align={align}
        alignItemWithTrigger={alignItemWithTrigger}
        alignOffset={alignOffset}
        className="isolate z-50"
        side={side}
        sideOffset={sideOffset}
      >
        <SelectPrimitive.Popup
          className={cn(SELECT.content(), className)}
          data-align-trigger={alignItemWithTrigger}
          data-slot="select-content"
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}
export type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"> & { className?: string };

// GROUP -----------------------------------------------------------------------------------------------------------------------------------
export function SelectGroup({ className, ...props }: SelectGroupProps) {
  return <SelectPrimitive.Group className={cn(SELECT.group(), className)} data-slot="select-group" {...props} />;
}
export type SelectGroupProps = Omit<SelectPrimitive.Group.Props, "className"> & { className?: string };

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export function SelectItem({ className, children, ...props }: SelectItemProps) {
  return (
    <SelectPrimitive.Item className={cn(SELECT.item(), className)} data-slot="select-item" {...props}>
      <SelectPrimitive.ItemText className={SELECT.itemText()}>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={<span className={SELECT.itemIndicator()} />}>
        <span className="icon-[tabler--check] pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}
export type SelectItemProps = Omit<SelectPrimitive.Item.Props, "className"> & { className?: string };

// LABEL -----------------------------------------------------------------------------------------------------------------------------------
export function SelectLabel({ className, ...props }: SelectLabelProps) {
  return <SelectPrimitive.GroupLabel className={cn(SELECT.label(), className)} data-slot="select-label" {...props} />;
}
export type SelectLabelProps = Omit<SelectPrimitive.GroupLabel.Props, "className"> & { className?: string };

// SCROLL DOWN BUTTON ----------------------------------------------------------------------------------------------------------------------
export function SelectScrollDownButton({ className, ...props }: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownArrow className={cn(SELECT.scrollDownButton(), className)} data-slot="select-scroll-down-button" {...props}>
      <span className="icon-[tabler--chevron-down]" />
    </SelectPrimitive.ScrollDownArrow>
  );
}
export type SelectScrollDownButtonProps = Omit<React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>, "className"> & {
  className?: string;
};

// SCROLL UP BUTTON ------------------------------------------------------------------------------------------------------------------------
export function SelectScrollUpButton({ className, ...props }: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpArrow className={cn(SELECT.scrollUpButton(), className)} data-slot="select-scroll-up-button" {...props}>
      <span className="icon-[tabler--chevron-up]" />
    </SelectPrimitive.ScrollUpArrow>
  );
}
export type SelectScrollUpButtonProps = Omit<React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>, "className"> & {
  className?: string;
};

// SEPARATOR -------------------------------------------------------------------------------------------------------------------------------
export function SelectSeparator({ className, ...props }: SelectSeparatorProps) {
  return <SelectPrimitive.Separator className={cn(SELECT.separator(), className)} data-slot="select-separator" {...props} />;
}
export type SelectSeparatorProps = Omit<SelectPrimitive.Separator.Props, "className"> & { className?: string };

// TRIGGER ---------------------------------------------------------------------------------------------------------------------------------
export function SelectTrigger({ className, size = "default", children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger className={cn(SELECT.trigger(), className)} data-size={size} data-slot="select-trigger" {...props}>
      {children}
      <SelectPrimitive.Icon render={<span className={SELECT.triggerIcon()} />} />
    </SelectPrimitive.Trigger>
  );
}
export type SelectTriggerProps = Omit<SelectPrimitive.Trigger.Props, "className"> & { className?: string; size?: "sm" | "default" };

// VALUE -----------------------------------------------------------------------------------------------------------------------------------
export function SelectValue({ className, ...props }: SelectValueProps) {
  return <SelectPrimitive.Value className={cn(SELECT.value(), className)} data-slot="select-value" {...props} />;
}
export type SelectValueProps = Omit<SelectPrimitive.Value.Props, "className"> & { className?: string };
