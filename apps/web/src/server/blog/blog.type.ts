import type { z } from "zod";

import type {
  createBlogSchema,
  deleteBlogSchema,
  likeBlogSchema,
  unlikeBlogSchema,
  updateBlogSchema,
} from "./blog.schema";

declare global {
  type CreateBlogInput = z.infer<typeof createBlogSchema>;
  type CreateBlog = CreateBlogInput & {
    userId: string;
    authorName: string;
    authorUsername: string;
    authorImage: string | undefined;
  };

  type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
  type UpdateBlog = UpdateBlogInput & {
    userId: string;
    role: string;
  };

  type DeleteBlogInput = z.infer<typeof deleteBlogSchema>;
  type DeleteBlog = DeleteBlogInput & {
    userId: string;
    role: string;
  };

  type LikeBlogInput = z.infer<typeof likeBlogSchema>;
  type LikeBlog = LikeBlogInput & { userId: string };
  type UnlikeBlogInput = z.infer<typeof unlikeBlogSchema>;
  type UnlikeBlog = UnlikeBlogInput & { userId: string };
}

export {};
