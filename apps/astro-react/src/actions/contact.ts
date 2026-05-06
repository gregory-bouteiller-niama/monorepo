import { ActionError, defineAction } from "astro:actions";
import { env } from "cloudflare:workers";
import { api } from "@niama/backend/api";
import { createConvexHttpClient } from "@niama/backend/client";
import { zContactCreate } from "@niama/domain/functions/contacts";

export const contact = {
	create: defineAction({
		input: zContactCreate,
		handler: async (input) => {
			try {
				const client = createConvexHttpClient(env.VITE_CONVEX_URL);
				await client.mutation(api.contacts.create, input);
			} catch (error) {
				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: error instanceof Error ? error.message : "Unknown error",
				});
			}
		},
	}),
};
