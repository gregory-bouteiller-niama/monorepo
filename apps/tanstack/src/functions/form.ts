// import { ConvexHttpClient } from "convex/browser";
// import { api } from "@/convex/_generated/api";
// import { env } from "@/env";
import { zContactCreate } from "@niama/domain/functions/contacts";
import { createServerFn } from "@tanstack/react-start";

// CONTACT ---------------------------------------------------------------------------------------------------------------------------------
export const createContact = createServerFn({ method: "POST" })
	.inputValidator(zContactCreate)
	.handler(async () => {
		// const convex = new ConvexHttpClient(env.VITE_CONVEX_URL);
		// await convex.mutation(api.contacts.create, data);
	});
