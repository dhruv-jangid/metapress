import { BLOG_CATEGORIES } from "@metapress/shared/blogs";
import { checkProfanity } from "@metapress/shared/utils";
import type { JSONContent } from "@tiptap/core";
import { z } from "zod";

import { IdSchema } from "../common";
import { NameSchema, UsernameSchema } from "../common";

export const TitleSchema = z
  .string()
  .trim()
  .min(10, "Title must be atleast 10 characters")
  .max(100, "Title must be under 100 characters")
  .refine((text) => !checkProfanity(text), "Inappropriate Title");

export const ContentSchema = z.custom<BlogContent>();
export type BlogContent = JSONContent;

export const CategorySchema = z.enum(BLOG_CATEGORIES, "Invalid Category");

export const ImageURLSchema = z.url({ hostname: /^res.cloudinary\.com$/, protocol: /^https$/ });

export const UserImageURLSchema = z.string().nullable();

export const BlogSchema = z.object({
  id: IdSchema,
  title: TitleSchema,
  content: ContentSchema,
  cover: ImageURLSchema,
  category: CategorySchema,
  createdAt: z.string("createdAt can't be empty"),
  updatedAt: z.string("updatedAt can't be empty"),
  author: z.object({
    name: NameSchema,
    username: UsernameSchema,
    image: UserImageURLSchema,
  }),
});
export type Blog = z.infer<typeof BlogSchema>;

export const ReturnBlogSchema = z.object({
  ...BlogSchema.shape,
  likes: z.number().nonnegative(),
  isLiked: z.boolean(),
});
export type ReturnBlog = z.infer<typeof ReturnBlogSchema>;

export const BlogsSchema = z.array(BlogSchema);

export const GetFeedSchema = z.object({ limit: z.number().min(1).max(100).default(20) }).optional();

export const GetBlogSchema = z.object({ id: IdSchema });

export const CreateBlogSchema = z.object({
  title: TitleSchema,
  content: ContentSchema,
  category: CategorySchema,
  cover: ImageURLSchema,
  images: z
    .array(
      z.object({
        url: ImageURLSchema,
        publicId: z.string().min(1, "publicId is required"),
      }),
    )
    .min(1, "At least 1 image is required")
    .max(3, "Only 3 images allowed"),
});
export type CreateBlogInput = z.infer<typeof CreateBlogSchema>;

export const UpdateBlogSchema = z.object({
  blogId: IdSchema,
  title: TitleSchema,
  content: ContentSchema,
  category: CategorySchema,
  cover: ImageURLSchema,
  images: z
    .array(
      z.object({
        url: ImageURLSchema,
        publicId: z.string().min(1, "publicId is required"),
      }),
    )
    .min(1, "At least 1 image is required")
    .max(3, "Only 3 images allowed"),
  imagesToDelete: z.array(z.string()),
});
export type UpdateBlogInput = z.infer<typeof UpdateBlogSchema>;

export const DeleteBlogSchema = z.object({
  blogId: IdSchema,
});
export type DeleteBlogInput = z.infer<typeof DeleteBlogSchema>;

export const LikeUnlikeBlogSchema = z.object({
  blogId: IdSchema,
});
export type LikeUnlikeBlogInput = z.infer<typeof LikeUnlikeBlogSchema>;
