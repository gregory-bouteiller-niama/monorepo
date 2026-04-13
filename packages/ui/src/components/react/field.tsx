import { useMemo } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Label } from "./label";
import { Separator } from "./separator";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const STYLES = tv({
	base: "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
	slots: {
		content: "group/field-content flex flex-1 flex-col gap-1 leading-snug",
		description: `text-left font-normal text-muted-foreground text-sm leading-normal 
    group-has-data-horizontal/field:text-balance 
    [[data-variant=legend]+&]:-mt-1.5 
    nth-last-2:-mt-1 last:mt-0 
    [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4`,
		error: "font-normal text-destructive text-sm",
		group: `group/field-group @container/field-group flex w-full flex-col gap-7 
    data-[slot=checkbox-group]:gap-3 
    *:data-[slot=field-group]:gap-4`,
		label: `group/field-label peer/field-label flex w-fit gap-2 leading-snug 
    has-[>[data-slot=field]]:rounded-xl has-[>[data-slot=field]]:border 
    has-data-checked:border-primary/30 has-data-checked:bg-primary/5 
    *:data-[slot=field]:p-4 
    group-data-[disabled=true]/field:opacity-50 
    dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10 
    has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col`,
		legend: `mb-3 font-medium
    data-[variant=label]:text-sm 
    data-[variant=legend]:text-base`,
		separator: `relative -my-2 h-5 text-sm 
    group-data-[variant=outline]/field-group:-mb-2`,
		separatorContent: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
		set: `flex flex-col gap-6 
    has-[>[data-slot=checkbox-group]]:gap-3 
    has-[>[data-slot=radio-group]]:gap-3`,
		title: `flex w-fit items-center gap-2 font-medium text-sm leading-snug 
    group-data-[disabled=true]/field:opacity-50`,
	},
	variants: {
		orientation: {
			horizontal: {
				base: `flex-row items-center 
        has-[>[data-slot=field-content]]:items-start 
        *:data-[slot=field-label]:flex-auto 
        has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px`,
			},
			responsive: {
				base: `@md/field-group:flex-row flex-col 
        @md/field-group:items-center *:w-full @md/field-group:*:w-auto 
        @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto 
        [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px`,
			},
			vertical: {
				base: "flex-col *:w-full [&>.sr-only]:w-auto",
			},
		},
	},
	defaultVariants: {
		orientation: "vertical",
	},
});

export const FIELD = STYLES();

// BASE ------------------------------------------------------------------------------------------------------------------------------------
export function Field({ className, orientation = "vertical", ...props }: FieldProps) {
	return (
		<div className={FIELD.base({ className, orientation })} data-orientation={orientation} data-slot="field" role="group" {...props} />
	);
}
export type FieldProps = React.ComponentProps<"div"> & Pick<FieldStyles, "orientation">;

// CONTENT ---------------------------------------------------------------------------------------------------------------------------------
export function FieldContent({ className, ...props }: FieldContentProps) {
	return <div className={FIELD.content({ className })} data-slot="field-content" {...props} />;
}
export type FieldContentProps = React.ComponentProps<"div">;

// DESCRIPTION -----------------------------------------------------------------------------------------------------------------------------
export function FieldDescription({ className, ...props }: FieldDescriptionProps) {
	return <p className={FIELD.description({ className })} data-slot="field-description" {...props} />;
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
				{uniqueErrors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
			</ul>
		);
	}, [children, errors]);

	if (!content) {
		return null;
	}

	return (
		<div className={FIELD.error({ className })} data-slot="field-error" role="alert" {...props}>
			{content}
		</div>
	);
}
export type FieldErrorProps = React.ComponentProps<"div"> & { errors?: Array<{ message?: string } | undefined> };

// GROUP -----------------------------------------------------------------------------------------------------------------------------------
export function FieldGroup({ className, ...props }: FieldGroupProps) {
	return <div className={FIELD.group({ className })} data-slot="field-group" {...props} />;
}
export type FieldGroupProps = React.ComponentProps<"div">;

// LABEL -----------------------------------------------------------------------------------------------------------------------------------
export function FieldLabel({ className, ...props }: FieldLabelProps) {
	return <Label className={FIELD.label({ className })} data-slot="field-label" {...props} />;
}
export type FieldLabelProps = Omit<React.ComponentProps<typeof Label>, "className"> & { className?: string };

// LEGEND ----------------------------------------------------------------------------------------------------------------------------------
export function FieldLegend({ className, variant = "legend", ...props }: FieldLegendProps) {
	return <legend className={FIELD.legend({ className })} data-slot="field-legend" data-variant={variant} {...props} />;
}
export type FieldLegendProps = React.ComponentProps<"legend"> & { variant?: "legend" | "label" };

// SEPARATOR -------------------------------------------------------------------------------------------------------------------------------
export function FieldSeparator({ children, className, ...props }: FieldSeparatorProps) {
	return (
		<div className={FIELD.separator({ className })} data-content={!!children} data-slot="field-separator" {...props}>
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
	return <fieldset className={FIELD.set({ className })} data-slot="field-set" {...props} />;
}
export type FieldSetProps = React.ComponentProps<"fieldset">;

// TITLE -----------------------------------------------------------------------------------------------------------------------------------
export function FieldTitle({ className, ...props }: FieldTitleProps) {
	return <div className={FIELD.title({ className })} data-slot="field-label" {...props} />;
}
export type FieldTitleProps = React.ComponentProps<"div">;

// TYPES -----------------------------------------------------------------------------------------------------------------------------------
export type FieldStyles = VariantProps<typeof STYLES>;
