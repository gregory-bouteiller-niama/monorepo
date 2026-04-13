import { actions } from "astro:actions";
import { ContactForm as ContactFormNative } from "@niama/ui/react/contact-form";

// MAIN ------------------------------------------------------------------------------------------------------------------------------------
export function ContactForm() {
	return (
		<ContactFormNative
			onSubmit={async (value) => {
				const { error } = await actions.contact.create(value);
				if (error) throw error;
			}}
		/>
	);
}
