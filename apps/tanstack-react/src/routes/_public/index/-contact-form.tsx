import { ContactForm as ContactFormNative } from "@niama/ui/react/contact-form";
import { toast } from "sonner";
import { createContact } from "@/functions/form";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function ContactForm() {
	return (
		<ContactFormNative
			onSubmit={async (value) => {
				await createContact({ data: value });
			}}
			onSuccess={() => {
				toast.success("Merci de votre intérêt ! Nous reviendrons vers vous très bientôt.");
			}}
		/>
	);
}
