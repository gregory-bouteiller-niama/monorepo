import { type Contacts, defaultContactCreateValues } from "@niama/domain/functions/contacts";
import { readAllDisciplines } from "@niama/domain/functions/disciplines";
import { cn } from "@niama/ui-solid/lib/utils";
import { Button } from "@niama/ui-solid/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@niama/ui-solid/ui/card";
import { Input } from "@niama/ui-solid/ui/input";
import { Textarea } from "@niama/ui-solid/ui/textarea";
import { createSignal } from "solid-js";
import { toast } from "solid-sonner";
import { LoadingSwap } from "@/components/loading-swap";
import { createContact } from "@/functions/form";

const CONTACT = {
  card: "relative w-full max-w-xl border-0 ring-0",
  description: "italic",
  form: "flex w-full flex-col items-center gap-4",
} as const;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  let formRef: HTMLFormElement | undefined;
  const subjects = [
    { label: "Commencer mon parcours", value: "discipline" },
    { label: "Devenir accompagnant", value: "attendant" },
    { label: "Poser une question", value: "question" },
  ];
  const disciplines = [
    { label: "Voie non déterminée", value: "unknown" },
    { label: "Nouvelle voie", value: "new" },
    ...readAllDisciplines().map(({ slug: value, title: label }) => ({ label, value })),
  ];

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (!formRef?.reportValidity()) return;

    const data = Object.fromEntries(new FormData(formRef).entries()) as Record<string, string>;
    const payload: Contacts["CreateValues"] = {
      discipline: (data.discipline ?? defaultContactCreateValues.discipline) as Contacts["CreateValues"]["discipline"],
      email: data.email ?? "",
      forename: data.forename ?? "",
      message: data.message ?? "",
      subject: (data.subject ?? defaultContactCreateValues.subject) as Contacts["CreateValues"]["subject"],
      surname: data.surname ?? "",
    };

    try {
      setIsSubmitting(true);
      await createContact({ data: payload });
      formRef?.reset();
      toast.success("Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card class={CONTACT.card}>
      <CardContent>
        <form class={CONTACT.form} novalidate onSubmit={handleSubmit} ref={formRef}>
          <CardHeader class="w-full px-0">
            <CardTitle class="text-center font-heading text-4xl">Votre demande</CardTitle>
            <CardDescription class={cn(CONTACT.description, "text-center")}>- tous les champs sont obligatoires -</CardDescription>
          </CardHeader>

          <fieldset class="flex w-full flex-col gap-3">
            <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <label class="flex flex-col gap-2">
                <span>Prénom</span>
                <Input name="forename" placeholder="Prénom" required value={defaultContactCreateValues.forename} />
              </label>
              <label class="flex flex-col gap-2">
                <span>Nom</span>
                <Input name="surname" placeholder="Nom" required value={defaultContactCreateValues.surname} />
              </label>
            </div>

            <label class="flex flex-col gap-2">
              <span>Courriel</span>
              <Input name="email" placeholder="Courriel" required type="email" value={defaultContactCreateValues.email} />
            </label>
          </fieldset>

          <fieldset class="flex w-full flex-col gap-3">
            <div class="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              <label class="flex flex-col gap-2">
                <span>Sujet</span>
                <select
                  class="h-9 rounded-4xl border border-input bg-input/30 px-3 text-sm outline-none"
                  name="subject"
                  required
                  value={defaultContactCreateValues.subject}
                >
                  {subjects.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </select>
              </label>

              <label class="flex flex-col gap-2">
                <span>Voie</span>
                <select
                  class="h-9 rounded-4xl border border-input bg-input/30 px-3 text-sm outline-none"
                  name="discipline"
                  required
                  value={defaultContactCreateValues.discipline}
                >
                  {disciplines.map(({ label, value }) => (
                    <option value={value}>{label}</option>
                  ))}
                </select>
              </label>
            </div>

            <label class="flex flex-col gap-2">
              <span>Message</span>
              <Textarea name="message" placeholder="Message" required value={defaultContactCreateValues.message} />
            </label>
          </fieldset>

          <Button class="cursor-pointer text-base" disabled={isSubmitting()} size="lg" type="submit">
            <LoadingSwap isLoading={isSubmitting()}>Envoyer</LoadingSwap>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
