import { type Contacts, defaultContactCreateValues, zContactCreateValues } from "@niama/domain/functions/contacts";
import { useAppForm } from "@niama/ui/hooks/form";
import { Card, CardContent } from "@niama/ui/react/card";
import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from "@niama/ui/react/field";
import { cva } from "class-variance-authority";

// STYLES ----------------------------------------------------------------------------------------------------------------------------------
const CONTACT = {
  card: cva("@container relative w-full max-w-xl border-0 ring-0"),
  description: cva("italic"),
  form: cva("flex w-full flex-col items-center gap-4"),
};

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function ContactForm({ onSubmit, onSuccess }: ContactFormProps) {
  const subjects = [
    { label: "Commencer mon parcours", value: "discipline" },
    { label: "Devenir accompagnant", value: "attendant" },
    { label: "Poser une question", value: "question" },
  ];

  const form = useAppForm({
    defaultValues: defaultContactCreateValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
      form.reset();
      onSuccess?.();
    },
  });

  return (
    <Card className={CONTACT.card()}>
      <CardContent>
        <form
          className={CONTACT.form()}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <FieldGroup>
              <FieldSet>
                <FieldLegend>Votre demande</FieldLegend>
                <FieldDescription className={CONTACT.description()}>- tous les champs sont obligatoires -</FieldDescription>
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  <form.AppField name="forename" validators={{ onChange: zContactCreateValues.shape.forename }}>
                    {({ InputField }) => <InputField label="Prénom" type="text" />}
                  </form.AppField>
                  <form.AppField name="surname" validators={{ onChange: zContactCreateValues.shape.surname }}>
                    {({ InputField }) => <InputField label="Nom" type="text" />}
                  </form.AppField>
                </div>
                <form.AppField name="email" validators={{ onChange: zContactCreateValues.shape.email }}>
                  {({ InputField }) => <InputField label="Courriel" type="email" />}
                </form.AppField>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                  <form.AppField name="subject" validators={{ onChange: zContactCreateValues.shape.subject }}>
                    {({ SelectField }) => <SelectField defaultValue="discipline" items={subjects} label="Sujet" placeholder="Sujet" />}
                  </form.AppField>
                  <form.AppField name="discipline" validators={{ onChange: zContactCreateValues.shape.discipline }}>
                    {({ DisciplinesSelectField }) => <DisciplinesSelectField />}
                  </form.AppField>
                </div>
                <form.AppField name="message" validators={{ onChange: zContactCreateValues.shape.message }}>
                  {({ TextareaField }) => <TextareaField label="Message" />}
                </form.AppField>
              </FieldSet>
            </FieldGroup>
            <form.Submit />
          </form.AppForm>
        </form>
      </CardContent>
    </Card>
  );
}
export type ContactFormProps = {
  onSubmit: (value: Contacts["CreateValues"]) => Promise<void>;
  onSuccess?: () => void;
};
