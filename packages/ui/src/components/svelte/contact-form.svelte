<script lang="ts">
  import { type Contacts, defaultContactCreateValues, zContactCreateValues } from "@niama/domain/functions/contacts";
  import { createForm } from "@tanstack/svelte-form";
  import { cva } from "class-variance-authority";
  import { Button } from "./button";
  import { Card, CardContent } from "./card";
  import { Input } from "./input";
  import { Label } from "./label";
  import { NativeSelect } from "./native-select";
  import { Textarea } from "./textarea";

  const CONTACT = {
    card: cva("@container relative w-full max-w-xl border-0 ring-0"),
    description: cva("italic"),
    error: cva("text-center text-destructive text-sm"),
    field: cva("flex w-full flex-col gap-2"),
    fieldset: cva("flex w-full flex-col gap-4"),
    form: cva("flex w-full flex-col items-center gap-4"),
    grid: cva("grid w-full grid-cols-1 gap-3 sm:grid-cols-2"),
    legend: cva("text-center font-heading text-3xl"),
    separator: cva("h-px w-full bg-border"),
    submit: cva("min-w-56 uppercase tracking-widest"),
  };

  const subjects = [
    { label: "Commencer mon parcours", value: "discipline" },
    { label: "Devenir accompagnant", value: "attendant" },
    { label: "Poser une question", value: "question" },
  ] as const;

  type ContactFormProps = {
    onSubmit: (value: Contacts["CreateValues"]) => Promise<void>;
    onSuccess?: () => void;
  };

  let { onSubmit, onSuccess }: ContactFormProps = $props();
  let submitError = $state<string | undefined>(undefined);

  const form = createForm(() => ({
    defaultValues: defaultContactCreateValues,
    onSubmit: async ({ value }) => {
      submitError = undefined;

      try {
        await onSubmit(value);
        form.reset();
        onSuccess?.();
      } catch (error) {
        submitError = error instanceof Error ? error.message : "Une erreur est survenue.";
      }
    },
  }));

  const fieldError = (errors: unknown[]) => {
    const first = errors[0];
    return typeof first === "string" ? first : undefined;
  };
</script>

<Card class={CONTACT.card()}>
  <CardContent>
    <form
      class={CONTACT.form()}
      novalidate
      onsubmit={(event) => {
				event.preventDefault();
				event.stopPropagation();
				form.handleSubmit();
			}}
    >
      <form.Field name="forename" validators={{ onChange: zContactCreateValues.shape.forename }}>
        {#snippet children(forename)}
          <form.Field name="surname" validators={{ onChange: zContactCreateValues.shape.surname }}>
            {#snippet children(surname)}
              <form.Field name="email" validators={{ onChange: zContactCreateValues.shape.email }}>
                {#snippet children(email)}
                  <form.Field name="subject" validators={{ onChange: zContactCreateValues.shape.subject }}>
                    {#snippet children(subject)}
                      <form.Field name="discipline" validators={{ onChange: zContactCreateValues.shape.discipline }}>
                        {#snippet children(discipline)}
                          <form.Field name="message" validators={{ onChange: zContactCreateValues.shape.message }}>
                            {#snippet children(message)}
                              <fieldset class={CONTACT.fieldset()}>
                                <legend class={CONTACT.legend()}>Votre demande</legend>
                                <p class={CONTACT.description()}>- tous les champs sont obligatoires -</p>

                                <div class={CONTACT.grid()}>
                                  <div class={CONTACT.field()}>
                                    <Label for={forename.name}>Prénom</Label>
                                    <Input
                                      aria-invalid={forename.state.meta.errors.length > 0}
                                      id={forename.name}
                                      name={forename.name}
                                      onblur={forename.handleBlur}
                                      oninput={(event) => forename.handleChange((event.currentTarget as HTMLInputElement).value)}
                                      type="text"
                                      value={forename.state.value}
                                    />
                                    {#if forename.state.meta.isTouched && fieldError(forename.state.meta.errors)}
                                      <p class={CONTACT.error()} role="alert">{fieldError(forename.state.meta.errors)}</p>
                                    {/if}
                                  </div>

                                  <div class={CONTACT.field()}>
                                    <Label for={surname.name}>Nom</Label>
                                    <Input
                                      aria-invalid={surname.state.meta.errors.length > 0}
                                      id={surname.name}
                                      name={surname.name}
                                      onblur={surname.handleBlur}
                                      oninput={(event) => surname.handleChange((event.currentTarget as HTMLInputElement).value)}
                                      type="text"
                                      value={surname.state.value}
                                    />
                                    {#if surname.state.meta.isTouched && fieldError(surname.state.meta.errors)}
                                      <p class={CONTACT.error()} role="alert">{fieldError(surname.state.meta.errors)}</p>
                                    {/if}
                                  </div>
                                </div>

                                <div class={CONTACT.field()}>
                                  <Label for={email.name}>Courriel</Label>
                                  <Input
                                    aria-invalid={email.state.meta.errors.length > 0}
                                    id={email.name}
                                    name={email.name}
                                    onblur={email.handleBlur}
                                    oninput={(event) => email.handleChange((event.currentTarget as HTMLInputElement).value)}
                                    type="email"
                                    value={email.state.value}
                                  />
                                  {#if email.state.meta.isTouched && fieldError(email.state.meta.errors)}
                                    <p class={CONTACT.error()} role="alert">{fieldError(email.state.meta.errors)}</p>
                                  {/if}
                                </div>

                                <div class={CONTACT.separator()}></div>

                                <div class={CONTACT.grid()}>
                                  <div class={CONTACT.field()}>
                                    <Label for={subject.name}>Sujet</Label>
                                    <NativeSelect
                                      aria-invalid={subject.state.meta.errors.length > 0}
                                      id={subject.name}
                                      name={subject.name}
                                      onblur={subject.handleBlur}
                                      onchange={(event) =>
																				subject.handleChange(
																					(event.currentTarget as HTMLSelectElement).value as Contacts["CreateValues"]["subject"],
																				)}
                                      value={subject.state.value}
                                    >
                                      {#each subjects as item}
                                        <option value={item.value}>{item.label}</option>
                                      {/each}
                                    </NativeSelect>
                                    {#if subject.state.meta.isTouched && fieldError(subject.state.meta.errors)}
                                      <p class={CONTACT.error()} role="alert">{fieldError(subject.state.meta.errors)}</p>
                                    {/if}
                                  </div>

                                  <div class={CONTACT.field()}>
                                    <Label for={discipline.name}>Voie</Label>
                                    <NativeSelect
                                      aria-invalid={discipline.state.meta.errors.length > 0}
                                      id={discipline.name}
                                      name={discipline.name}
                                      onblur={discipline.handleBlur}
                                      onchange={(event) =>
																				discipline.handleChange(
																					(event.currentTarget as HTMLSelectElement).value as Contacts["CreateValues"]["discipline"],
																				)}
                                      value={discipline.state.value}
                                    >
                                      <option value="unknown">Je ne sais pas encore</option>
                                      <option value="yogart">Yog'art</option>
                                      <option value="anima">Hypnose spirituelle</option>
                                      <option value="animus">Hormèse subtile</option>
                                      <option value="astro">Astro</option>
                                      <option value="new">Autre voie</option>
                                    </NativeSelect>
                                    {#if discipline.state.meta.isTouched && fieldError(discipline.state.meta.errors)}
                                      <p class={CONTACT.error()} role="alert">{fieldError(discipline.state.meta.errors)}</p>
                                    {/if}
                                  </div>
                                </div>

                                <div class={CONTACT.field()}>
                                  <Label for={message.name}>Message</Label>
                                  <Textarea
                                    aria-invalid={message.state.meta.errors.length > 0}
                                    id={message.name}
                                    name={message.name}
                                    onblur={message.handleBlur}
                                    oninput={(event) => message.handleChange((event.currentTarget as HTMLTextAreaElement).value)}
                                    rows={6}
                                    value={message.state.value}
                                  />
                                  {#if message.state.meta.isTouched && fieldError(message.state.meta.errors)}
                                    <p class={CONTACT.error()} role="alert">{fieldError(message.state.meta.errors)}</p>
                                  {/if}
                                </div>

                                {#if submitError}
                                  <p class={CONTACT.error()} role="alert">{submitError}</p>
                                {/if}
                              </fieldset>

                              <form.Subscribe
                                selector={(state) => ({
																	canSubmit: state.canSubmit,
																	isSubmitting: state.isSubmitting,
																})}
                              >
                                {#snippet children(state)}
                                  <Button
                                    aria-disabled={!state.canSubmit || state.isSubmitting}
                                    class={CONTACT.submit()}
                                    disabled={state.isSubmitting}
                                    type="submit"
                                    variant="outline"
                                  >
                                    {state.isSubmitting ? "Envoi..." : "Envoyer"}
                                  </Button>
                                {/snippet}
                              </form.Subscribe>
                            {/snippet}
                          </form.Field>
                        {/snippet}
                      </form.Field>
                    {/snippet}
                  </form.Field>
                {/snippet}
              </form.Field>
            {/snippet}
          </form.Field>
        {/snippet}
      </form.Field>
    </form>
  </CardContent>
</Card>
