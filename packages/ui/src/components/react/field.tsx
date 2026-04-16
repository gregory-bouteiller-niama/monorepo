import { cva, type VariantProps } from "class-variance-authority";
import { useMemo } from "react";
import { cn } from "../../lib/utils";
import { Label } from "./label";
import { Separator } from "./separator";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
export const FIELD = {
  base: cva("group/field flex w-full gap-3 data-[invalid=true]:text-destructive", {
    variants: {
      orientation: {
        horizontal: `flex-row items-center 
					has-[>[data-slot=field-content]]:items-start 
					*:data-[slot=field-label]:flex-auto 
					has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px`,
        responsive: `@md/field-group:flex-row flex-col 
					@md/field-group:items-center *:w-full @md/field-group:*:w-auto 
					@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto 
					[&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px`,
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }),
  content: cva("group/field-content flex flex-1 flex-col gap-1 leading-snug"),
  description: cva(`text-left font-normal text-muted-foreground text-sm leading-normal 
		group-has-data-horizontal/field:text-balance 
		[[data-variant=legend]+&]:-mt-1.5 
		nth-last-2:-mt-1 last:mt-0 
		[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4`),
  error: cva("font-normal text-destructive text-sm"),
  group: cva(`group/field-group @container/field-group flex w-full flex-col gap-7 
		data-[slot=checkbox-group]:gap-3 
		*:data-[slot=field-group]:gap-4`),
  label: cva(`group/field-label peer/field-label flex w-fit gap-2 leading-snug 
		has-[>[data-slot=field]]:rounded-xl has-[>[data-slot=field]]:border 
		has-data-checked:border-primary/30 has-data-checked:bg-primary/5 
		*:data-[slot=field]:p-4 
		group-data-[disabled=true]/field:opacity-50 
		dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 
		has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col`),
  legend: cva(`mb-3 font-medium
		data-[variant=label]:text-sm 
		data-[variant=legend]:text-base`),
  separator: cva(`relative -my-2 h-5 text-sm 
		group-data-[variant=outline]/field-group:-mb-2`),
  separatorContent: cva("relative mx-auto block w-fit bg-background px-2 text-muted-foreground"),
  set: cva(`flex flex-col gap-6 
		has-[>[data-slot=checkbox-group]]:gap-3 
		has-[>[data-slot=radio-group]]:gap-3`),
  title: cva(`flex w-fit items-center gap-2 font-medium text-sm leading-snug 
		group-data-[disabled=true]/field:opacity-50`),
} as const;

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: Field is a generic wrapper and changing it to fieldset would alter markup semantics.
    <div className={cn(FIELD.base({ orientation }), className)} data-orientation={orientation} data-slot="field" role="group" {...props} />
  );
}
export type FieldProps = React.ComponentProps<"div"> & Pick<FieldStyles, "orientation">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function FieldContent({ className, ...props }: FieldContentProps) {
  return <div className={cn(FIELD.content(), className)} data-slot="field-content" {...props} />;
}
export type FieldContentProps = React.ComponentProps<"div">;

// DESCRIPTION -----------------------------------------------------------------------------------------------------------------------------
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
  return <p className={cn(FIELD.description(), className)} data-slot="field-description" {...props} />;
}
export type FieldDescriptionProps = React.ComponentProps<"p">;

// ERROR -----------------------------------------------------------------------------------------------------------------------------------
export function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors?.length) {
      return null;
    }

    const uniqueErrors = [...new Map(errors.map((error) => [error?.message, error])).values()];

    if (uniqueErrors?.length === 1) {
      return uniqueErrors[0]?.message;
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {uniqueErrors.map((error) => error?.message && <li key={error.message}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div className={cn(FIELD.error(), className)} data-slot="field-error" role="alert" {...props}>
      {content}
    </div>
  );
}
export type FieldErrorProps = React.ComponentProps<"div"> & { errors?: Array<{ message?: string } | undefined> };

// GROUP -----------------------------------------------------------------------------------------------------------------------------------
export function FieldGroup({ className, ...props }: FieldGroupProps) {
  return <div className={cn(FIELD.group(), className)} data-slot="field-group" {...props} />;
}
export type FieldGroupProps = React.ComponentProps<"div">;

// LABEL -----------------------------------------------------------------------------------------------------------------------------------
export function FieldLabel({ className, ...props }: FieldLabelProps) {
  return <Label className={cn(FIELD.label(), className)} data-slot="field-label" {...props} />;
}
export type FieldLabelProps = Omit<React.ComponentProps<typeof Label>, "className"> & { className?: string };

// LEGEND ----------------------------------------------------------------------------------------------------------------------------------
export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
  return <legend className={cn(FIELD.legend(), className)} data-slot="field-legend" data-variant={variant} {...props} />;
}
export type FieldLegendProps = React.ComponentProps<"legend"> & { variant?: "legend" | "label" };

// SEPARATOR -------------------------------------------------------------------------------------------------------------------------------
export function FieldSeparator({ children, className, ...props }: FieldSeparatorProps) {
  return (
    <div className={cn(FIELD.separator(), className)} data-content={!!children} data-slot="field-separator" {...props}>
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span className={FIELD.separatorContent()} data-slot="field-separator-content">
          {children}
        </span>
      )}
    </div>
  );
}
export type FieldSeparatorProps = React.ComponentProps<"div"> & {
  children?: React.ReactNode;
};

// SET -------------------------------------------------------------------------------------------------------------------------------------
export function FieldSet({ className, ...props }: FieldSetProps) {
  return <fieldset className={cn(FIELD.set(), className)} data-slot="field-set" {...props} />;
}
export type FieldSetProps = React.ComponentProps<"fieldset">;

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export function FieldTitle({ className, ...props }: FieldTitleProps) {
  return <div className={cn(FIELD.title(), className)} data-slot="field-label" {...props} />;
}
export type FieldTitleProps = React.ComponentProps<"div">;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type FieldStyles = VariantProps<typeof FIELD.base>;
