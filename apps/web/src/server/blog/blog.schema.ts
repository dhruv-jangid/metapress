import { z } from "zod";

import { idSchema } from "../general/general.schema";
import { categorySchema, contentSchema, imageSchema, titleSchema } from "@/shared/blog/blog.schema";

export const createBlogSchema = z.object({
  title: titleSchema,
  content: contentSchema,
  category: categorySchema,
  cover: imageSchema,
  images: z
    .array(
      z.object({
        url: imageSchema,
        publicId: z.string().min(1, "publicId is required"),
      }),
    )
    .min(1, "At least 1 image is required")
    .max(3, "Only 3 images allowed"),
});

export const updateBlogSchema = z.object({
  blogId: idSchema,
  title: titleSchema,
  content: contentSchema,
  category: categorySchema,
  cover: imageSchema,
  images: z
    .array(
      z.object({
        url: imageSchema,
        publicId: z.string().min(1, "publicId is required"),
      }),
    )
    .min(1, "At least 1 image is required")
    .max(3, "Only 3 images allowed"),
  imagesToDelete: z.array(z.string()),
});

export const deleteBlogSchema = z.object({
  blogId: idSchema,
});

export const likeBlogSchema = z.object({
  blogId: idSchema,
});

export const unlikeBlogSchema = likeBlogSchema;
