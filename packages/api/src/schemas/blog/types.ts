import type { z } from "zod";

import type { CreateBlogSchema, DeleteBlogSchema, LikeUnlikeBlogSchema, UpdateBlogSchema } from ".";

export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;

export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>;

export type DeleteBlogInput = z.infer<typeof DeleteBlogSchema>;

export type LikeUnlikeBlogInput = z.infer<typeof LikeUnlikeBlogSchema>;
