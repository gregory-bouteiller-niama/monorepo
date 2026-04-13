import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

const Submit = lazy(() => import("@niama/ui/react/form/submit"));
const InputField = lazy(() => import("@niama/ui/react/form/input-field"));
const SelectField = lazy(() => import("@niama/ui/react/form/select-field"));
const TextareaField = lazy(() => import("@niama/ui/react/form/textarea-field"));

const DisciplinesSelectField = lazy(() => import("@niama/ui/react/disciplines/select-field"));

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
	fieldComponents: {
		DisciplinesSelectField,
		InputField,
		TextareaField,
		SelectField,
	},
	formComponents: {
		Submit,
	},
	fieldContext,
	formContext,
});
