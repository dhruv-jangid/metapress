import { z } from "zod";

export const MediaSignatureSchema = z.object({
  cloudName: z.string(),
  apiKey: z.string(),
  signature: z.string(),
  timestamp: z.string(),
  asset_folder: z.string(),
  transformation: z.string(),
});

export const GetMediaSignatureSchema = z.object({
  isUser: z.boolean(),
});

export const DeleteManyMediaSchema = z.object({
  publicIds: z.array(z.string()),
});
