<script lang="ts" module>
  export type ContactFormProps = {
    onSubmit: (value: Contacts["CreateValues"]) => Promise<void>;
    onSuccess?: () => void;
  };
</script>

<script lang="ts">
  import { type Contacts, defaultContactCreateValues, zContactCreateValues } from "@niama/domain/functions/contacts";
  import { CONTACT } from "@niama/ui/contact-form";
  import { createAppForm } from "@niama/ui-svelte/hooks/form";
  import { Card, CardContent } from "@niama/ui-svelte/ui/card";
  import { FieldDescription, FieldGroup, FieldLegend, FieldSeparator, FieldSet } from "@niama/ui-svelte/ui/field";

  const subjects = [
    { label: "Commencer mon parcours", value: "discipline" },
    { label: "Devenir accompagnant", value: "attendant" },
    { label: "Poser une question", value: "question" },
  ];

  let { onSubmit, onSuccess }: ContactFormProps = $props();

  const form = createAppForm(() => ({
    defaultValues: defaultContactCreateValues,
    onSubmit: async ({ value }) => {
      await onSubmit(value);
      form.reset();
      onSuccess?.();
    },
  }));
</script>

<Card class={CONTACT.card()}>
  <CardContent>
    <form
      class={CONTACT.form()}
      noValidate
      onsubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.AppForm>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Votre demande</FieldLegend>
            <FieldDescription class={CONTACT.description()}>- tous les champs sont obligatoires -</FieldDescription>
            <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <form.AppField name="forename" validators={{ onChange: zContactCreateValues.shape.forename }}>
                {#snippet children({InputField})}
                  <InputField label="Prénom" type="text" />
                {/snippet}
              </form.AppField>
              <form.AppField name="surname" validators={{ onChange: zContactCreateValues.shape.surname }}>
                {#snippet children({InputField})}
                  <InputField label="Nom" type="text" />
                {/snippet}
              </form.AppField>
            </div>
            <form.AppField name="email" validators={{ onChange: zContactCreateValues.shape.email }}>
              {#snippet children({InputField})}
                <InputField label="Courriel" type="email" />
              {/snippet}
            </form.AppField>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <form.AppField name="subject" validators={{ onChange: zContactCreateValues.shape.subject }}>
                {#snippet children({SelectField})}
                  <SelectField defaultValue="discipline" items={subjects} label="Sujet" placeholder="Sujet" />
                {/snippet}
              </form.AppField>
              <form.AppField name="discipline" validators={{ onChange: zContactCreateValues.shape.discipline }}>
                {#snippet children({DisciplinesSelectField})}
                  <DisciplinesSelectField />
                {/snippet}
              </form.AppField>
            </div>
            <form.AppField name="message" validators={{ onChange: zContactCreateValues.shape.message }}>
              {#snippet children({TextareaField})}
                <TextareaField label="Message" />
              {/snippet}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
        <form.Submit />
      </form.AppForm>
    </form>
  </CardContent>
</Card>
