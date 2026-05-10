<script lang="ts">
  import { actions } from "astro:actions";
  import { ContactForm as ContactFormNative } from "@niama/ui-svelte/contact-form";
  import { toast } from "svelte-sonner";
</script>

<ContactFormNative
  onSubmit={async (value) => {
    const { error } = await actions.contact.create(value);
    if (error) throw error;
  }}
  onSuccess={() => {
    toast.success("Succès", { description: "Merci de votre intérêt ! Nous reviendrons vers vous très bientôt." });
  }}
/>
