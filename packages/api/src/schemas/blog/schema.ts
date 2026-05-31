import { z } from "zod";

import { CategorySchema, ContentSchema, IdSchema, ImageURLSchema, TitleSchema } from "../common";

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

export const DeleteBlogSchema = z.object({
  blogId: IdSchema,
});

export const LikeUnlikeBlogSchema = z.object({
  blogId: IdSchema,
});
