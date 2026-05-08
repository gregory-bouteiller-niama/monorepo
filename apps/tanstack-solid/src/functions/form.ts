import { api } from "@niama/backend/api";
import { createConvexHttpClient } from "@niama/backend/client";
import { zContactCreate } from "@niama/domain/functions/contacts";
import { createServerFn } from "@tanstack/solid-start";

// CONTACT ---------------------------------------------------------------------------------------------------------------------------------
export const createContact = createServerFn({ method: "POST" })
	.inputValidator(zContactCreate)
	.handler(async ({ data }) => {
		const convex = createConvexHttpClient(import.meta.env.VITE_CONVEX_URL);
		await convex.mutation(api.contacts.create, data);
	});
