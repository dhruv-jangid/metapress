import { z } from "zod";

export const MediaSignatureSchema = z.object({
  cloudName: z.string(),
  apiKey: z.string(),
  signature: z.string(),
  timestamp: z.string(),
  asset_folder: z.string(),
  transformation: z.string(),
});
export type ReturnMediaSignature = z.infer<typeof MediaSignatureSchema>;

export const GetMediaSignatureSchema = z.object({
  isUser: z.boolean(),
});
export type GetMediaSignatureInput = z.infer<typeof GetMediaSignatureSchema>;

export const DeleteManyMediaSchema = z.object({
  publicIds: z.array(z.string()),
});
export type DeleteMediaInput = z.infer<typeof DeleteManyMediaSchema>;
