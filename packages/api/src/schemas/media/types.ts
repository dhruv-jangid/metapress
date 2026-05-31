import type { z } from "zod";

import { DeleteManyMediaSchema, GetMediaSignatureSchema } from "./schema";

export type GetMediaSignatureInput = z.infer<typeof GetMediaSignatureSchema>;

export type DeleteMediaInput = z.infer<typeof DeleteManyMediaSchema>;

export type ReturnMediaSignature = {
  cloudName: string;
  apiKey: string;
  signature: string;
  timestamp: string;
  asset_folder: string;
  transformation: string;
};
