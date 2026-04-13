import { zContactFields } from "@niama/domain/functions/contacts";
import { defineSchema, defineTable } from "convex/server";
import { zodOutputToConvex } from "convex-helpers/server/zod4";

export default defineSchema({
  contacts: defineTable(zodOutputToConvex(zContactFields)),
});
