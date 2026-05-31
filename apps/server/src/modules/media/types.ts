import type { GetMediaSignatureInput as GMSI } from "@metapress/api/schemas/media";

export type GetMediaSignatureInput = GMSI & {
  timestamp: string;
  transformation: string;
  asset_folder: string;
};
