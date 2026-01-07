import type { z } from "zod";
import type { JSONContent } from "@tiptap/react";

import type { blogSchema } from "../blog/blog.schema";
import type { commentSchema, contactUserSchema, newsletterSchema } from "./common.schema";

declare global {
  type Blog = z.infer<typeof blogSchema>;
  type BlogContent = JSONContent;
  type BlogComment = z.infer<typeof commentSchema>;

  type ContactUser = z.infer<typeof contactUserSchema>;

  type SubscribeNewsLetter = z.infer<typeof newsletterSchema>;
}

export {};
