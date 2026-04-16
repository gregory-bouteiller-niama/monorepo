import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cva } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/utils";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const DROPDOWN_MENU = {
  checkboxItem: cva(`relative flex cursor-default select-none items-center gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm outline-hidden 
		focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground 
		data-disabled:pointer-events-none data-inset:pl-9.5 data-disabled:opacity-50 
		[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`),
  checkboxItemIndicator: cva("pointer-events-none absolute right-2 flex items-center justify-center"),
  content: cva(`data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 
		data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 
		data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 
		data-[side=inline-end]:slide-in-from-left-2 z-50 max-h-(--available-height) w-(--anchor-width) min-w-48 
		origin-(--transform-origin) overflow-y-auto overflow-x-hidden rounded-2xl bg-popover p-1 text-popover-foreground 
		shadow-2xl outline-none ring-1 ring-foreground/5 duration-100 data-closed:animate-out data-open:animate-in 
		data-closed:overflow-hidden`),
  item: cva(`group/dropdown-menu-item relative flex cursor-default select-none items-center gap-2.5 rounded-xl px-3 py-2 text-sm 
		outline-hidden focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground 
		data-disabled:pointer-events-none data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-disabled:opacity-50 
		data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive 
		dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none 
		[&_svg]:shrink-0 data-[variant=destructive]:*:[svg]:text-destructive`),
  label: cva("px-3 py-2.5 text-muted-foreground text-xs data-inset:pl-9.5"),
  radioItem: cva(`relative flex cursor-default select-none items-center gap-2.5 rounded-xl py-2 pr-8 pl-3 text-sm outline-hidden 
		focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-disabled:pointer-events-none 
		data-inset:pl-9.5 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`),
  radioItemIndicator: cva("pointer-events-none absolute right-2 flex items-center justify-center"),
  separator: cva("-mx-1 my-1 h-px bg-border/50"),
  shortcut: cva("ml-auto text-muted-foreground text-xs tracking-widest group-focus/dropdown-menu-item:text-accent-foreground"),
  subContent: cva(`data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 
		data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 
		data-[side=top]:slide-in-from-bottom-2 w-auto min-w-36 rounded-2xl bg-popover p-1 text-popover-foreground shadow-2xl 
		ring-1 ring-foreground/5 duration-100 data-closed:animate-out data-open:animate-in`),
  subTrigger: cva(`flex cursor-default select-none items-center gap-2 rounded-xl px-3 py-2 text-sm outline-hidden focus:bg-accent 
		focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-open:bg-accent 
		data-popup-open:bg-accent data-inset:pl-9.5 data-open:text-accent-foreground data-popup-open:text-accent-foreground 
		[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0`),
  subTriggerIcon: cva("icon-[tabler--chevron-right] ml-auto"),
} as const;

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}
export type DropdownMenuProps = MenuPrimitive.Root.Props;

// CHECKBOX ITEM ---------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuCheckboxItem({ className, children, checked, inset, ...props }: DropdownMenuCheckboxItemProps) {
  return (
    <MenuPrimitive.CheckboxItem
      checked={checked}
      className={cn(DROPDOWN_MENU.checkboxItem(), className)}
      data-inset={inset}
      data-slot="dropdown-menu-checkbox-item"
      {...props}
    >
      <span className={DROPDOWN_MENU.checkboxItemIndicator()} data-slot="dropdown-menu-checkbox-item-indicator">
        <MenuPrimitive.CheckboxItemIndicator>
          <span className="icon-[tabler--check]" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}
export type DropdownMenuCheckboxItemProps = Omit<MenuPrimitive.CheckboxItem.Props, "className"> & { className?: string; inset?: boolean };

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuContent(props: DropdownMenuContentProps) {
  const { align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...rest } = props;
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50 outline-none"
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup className={cn(DROPDOWN_MENU.content(), className)} data-slot="dropdown-menu-content" {...rest} />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}
export type DropdownMenuContentProps = Omit<MenuPrimitive.Popup.Props, "className"> &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset"> & { className?: string };

// GROUP -----------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}
export type DropdownMenuGroupProps = MenuPrimitive.Group.Props;

// ITEM ------------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuItem({ className, inset, variant = "default", ...props }: DropdownMenuItemProps) {
  return (
    <MenuPrimitive.Item
      className={cn(DROPDOWN_MENU.item(), className)}
      data-inset={inset}
      data-slot="dropdown-menu-item"
      data-variant={variant}
      {...props}
    />
  );
}
export type DropdownMenuItemProps = Omit<MenuPrimitive.Item.Props, "className"> & {
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
};

// LABEL -----------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <MenuPrimitive.GroupLabel
      className={cn(DROPDOWN_MENU.label(), className)}
      data-inset={inset}
      data-slot="dropdown-menu-label"
      {...props}
    />
  );
}
export type DropdownMenuLabelProps = Omit<MenuPrimitive.GroupLabel.Props, "className"> & { className?: string; inset?: boolean };

// PORTAL ----------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}
export type DropdownMenuPortalProps = MenuPrimitive.Portal.Props;

// RADIO GROUP -----------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}
export type DropdownMenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;

// RADIO ITEM ------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuRadioItem({ className, children, inset, ...props }: DropdownMenuRadioItemProps) {
  return (
    <MenuPrimitive.RadioItem
      className={cn(DROPDOWN_MENU.radioItem(), className)}
      data-inset={inset}
      data-slot="dropdown-menu-radio-item"
      {...props}
    >
      <span className={DROPDOWN_MENU.radioItemIndicator()} data-slot="dropdown-menu-radio-item-indicator">
        <MenuPrimitive.RadioItemIndicator>
          <span className="icon-[tabler--check]" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}
export type DropdownMenuRadioItemProps = Omit<MenuPrimitive.RadioItem.Props, "className"> & { className?: string; inset?: boolean };

// SEPARATOR -------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return <MenuPrimitive.Separator className={cn(DROPDOWN_MENU.separator(), className)} data-slot="dropdown-menu-separator" {...props} />;
}
export type DropdownMenuSeparatorProps = Omit<MenuPrimitive.Separator.Props, "className"> & { className?: string };

// SHORTCUT --------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuShortcut({ className, ...props }: DropdownMenuShortcutProps) {
  return <span className={cn(DROPDOWN_MENU.shortcut(), className)} data-slot="dropdown-menu-shortcut" {...props} />;
}
export type DropdownMenuShortcutProps = React.ComponentProps<"span">;

// SUB -------------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}
export type DropdownMenuSubProps = MenuPrimitive.SubmenuRoot.Props;

// SUB CONTENT -----------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuSubContent(props: DropdownMenuSubContentProps) {
  const { align = "start", alignOffset = -3, side = "right", sideOffset = 0, className, ...rest } = props;
  return (
    <DropdownMenuContent
      align={align}
      alignOffset={alignOffset}
      className={cn(DROPDOWN_MENU.subContent(), className)}
      data-slot="dropdown-menu-sub-content"
      side={side}
      sideOffset={sideOffset}
      {...rest}
    />
  );
}
export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuContent>;

// SUB TRIGGER -----------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <MenuPrimitive.SubmenuTrigger
      className={cn(DROPDOWN_MENU.subTrigger(), className)}
      data-inset={inset}
      data-slot="dropdown-menu-sub-trigger"
      {...props}
    >
      {children}
      <span className={DROPDOWN_MENU.subTriggerIcon()} />
    </MenuPrimitive.SubmenuTrigger>
  );
}
export type DropdownMenuSubTriggerProps = Omit<MenuPrimitive.SubmenuTrigger.Props, "className"> & { className?: string; inset?: boolean };

// TRIGGER ---------------------------------------------------------------------------------------------------------------------------------
export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}
export type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props;
