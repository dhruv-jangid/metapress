import { z } from "zod";

export const GetCommentsQuerySchema = z.object({
  pageSize: z.optional(z.number().min(1).max(50).describe("Page size must be between 1 and 50")),
  cursor: z.optional(z.string()),
});
