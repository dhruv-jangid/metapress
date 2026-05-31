import type { JSONContent } from "@tiptap/core";
import type { z } from "zod";

import { ReturnBlogSchema, type BlogSchema } from "./schema";

export type Blog = z.infer<typeof BlogSchema>;
export type ReturnBlog = z.infer<typeof ReturnBlogSchema>;
export type BlogContent = JSONContent;
