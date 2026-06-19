import {
  CategorySchema,
  ContentSchema,
  ImageURLSchema,
  TitleSchema,
} from "@metapress/contracts/blogs";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@metapress/shared/blogs";
import { z } from "zod";

import { checkNudity } from "./check-nudity";

export const ImageSchema = z
  .file({ error: "Please upload an image file" })
  .min(1)
  .max(MAX_IMAGE_SIZE, { error: "Image size should be less than 5MB" })
  .mime(ALLOWED_IMAGE_TYPES, { error: "Only JPEG, PNG, and HEIC formats are allowed" })
  .pipe(
    z.file().refine(
      async (file) => {
        const result = await checkNudity(file);
        return result.safe;
      },
      { error: "Inappropriate content detected!" },
    ),
  );

export const CreateBlogSchema = z.object({
  title: TitleSchema,
  content: ContentSchema,
  category: CategorySchema,
  images: z
    .array(ImageSchema)
    .min(1, "At least 1 image is required")
    .max(3, "Only 3 images allowed"),
});

export const EditBlogSchema = z.object({
  title: TitleSchema,
  content: ContentSchema,
  category: CategorySchema,
  newImages: z.array(ImageSchema).max(3, "Only 3 images are allowed"),
  imagesToKeep: z.array(
    z.object({
      url: ImageURLSchema,
      publicId: z.string().min(1, "publicId is required"),
    }),
  ),
});
