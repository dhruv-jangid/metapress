import { z } from "zod";

export const GetImageSignatureSchema = z.object({
  isUser: z.boolean(),
});

export const DeleteImageSchema = z.object({
  publicId: z.string(),
});

export const DeleteImagesSchema = z.object({
  publicIds: z.array(z.string()),
});
