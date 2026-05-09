import { actions } from "astro:actions";
import { toast } from "@niama/ui-astro/toast";
import { ContactForm as ContactFormNative } from "@niama/ui-react/contact-form";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function ContactForm() {
  return (
    <ContactFormNative
      onSubmit={async (value) => {
        const { error } = await actions.contact.create(value);
        if (error) throw error;
      }}
      onSuccess={() => {
        toast.success("Succès", { description: "Merci de votre intérêt ! Nous reviendrons vers vous très bientôt." });
      }}
    />
  );
}
