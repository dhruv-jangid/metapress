import type { z } from "zod";

import type {
  DeleteImageSchema,
  DeleteImagesSchema,
  GetImageSignatureSchema,
} from "./image.schema";

declare global {
  type GetImageSignatureInput = z.infer<typeof GetImageSignatureSchema>;
  type GetImageSignature = GetImageSignatureInput & {
    timestamp: string;
    transformation: string;
    asset_folder: string;
  };
  type ReturnImageSignature = {
    cloudName: string;
    apiKey: string;
    signature: string;
    timestamp: string;
    asset_folder: string;
    transformation: string;
  };

  type DeleteImage = z.infer<typeof DeleteImageSchema>;

  type DeleteManyImages = z.infer<typeof DeleteImagesSchema>;
}
