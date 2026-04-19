import { api } from "@niama/backend/api";
import { createConvexHttpClient } from "@niama/backend/client";
import { zContactCreate } from "@niama/domain/functions/contacts";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const payload = await request.json().catch(() => null);
  const parsedPayload = zContactCreate.safeParse(payload);

  if (!parsedPayload.success) {
    return json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!import.meta.env.VITE_CONVEX_URL) {
    return json({ error: "La variable VITE_CONVEX_URL est manquante." }, { status: 500 });
  }

  try {
    const convex = createConvexHttpClient(import.meta.env.VITE_CONVEX_URL);
    await convex.mutation(api.contacts.create, parsedPayload.data);
    return json({ ok: true });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Une erreur est survenue." }, { status: 500 });
  }
};
