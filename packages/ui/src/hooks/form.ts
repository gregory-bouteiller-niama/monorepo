import InputField from "@niama/ui/react/form/input-field";
import SelectField from "@niama/ui/react/form/select-field";
import Submit from "@niama/ui/react/form/submit";
import TextareaField from "@niama/ui/react/form/textarea-field";
import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

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
