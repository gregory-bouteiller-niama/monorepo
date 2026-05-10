import { DisciplinesSelectField } from "@niama/ui-svelte/disciplines/select-field";
import { InputField } from "@niama/ui-svelte/form/input-field";
import { SelectField } from "@niama/ui-svelte/form/select-field";
import { Submit } from "@niama/ui-svelte/form/submit";
import { TextareaField } from "@niama/ui-svelte/form/textarea-field";
import { createFormCreator } from "@tanstack/svelte-form";

export const { createAppForm } = createFormCreator({
  fieldComponents: {
    DisciplinesSelectField,
    InputField,
    TextareaField,
    SelectField,
  },
  formComponents: {
    Submit,
  },
});
