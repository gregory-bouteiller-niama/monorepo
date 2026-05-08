import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { api } from "@niama/backend/api";
import { createConvexHttpClient } from "@niama/backend/client";
import { zContactCreate } from "@niama/domain/functions/contacts";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const parsed = zContactCreate.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        error: parsed.error.issues[0]?.message ?? "Une erreur est survenue.",
      },
      { status: 400 },
    );
  }

  try {
    const client = createConvexHttpClient(env.VITE_CONVEX_URL);
    await client.mutation(api.contacts.create, parsed.data);
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
};
