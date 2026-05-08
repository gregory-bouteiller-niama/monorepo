<script lang="ts">
  import { type Contacts } from "@niama/domain/functions/contacts";
  import { ContactForm as ContactFormNative } from "@niama/ui/svelte/contact-form";
  import { toast } from "svelte-sonner";

  const submitContact = async (value: Contacts["CreateValues"]) => {
    const response = await fetch("/api/contact", {
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    if (response.ok) {
      return;
    }

    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error ?? "Une erreur est survenue.");
  };
</script>

<ContactFormNative
  onSubmit={submitContact}
  onSuccess={() => {
    toast.success("Succès", {
      description: "Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.",
    });
  }}
/>
