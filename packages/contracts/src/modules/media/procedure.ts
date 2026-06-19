import { oc } from "@orpc/contract";

import { DeleteManyMediaSchema, GetMediaSignatureSchema, MediaSignatureSchema } from "./schema";

export const getMediaSignature = oc
  .route({ method: "GET" })
  .input(GetMediaSignatureSchema)
  .output(MediaSignatureSchema);

export const deleteManyMedia = oc.route({ method: "DELETE" }).input(DeleteManyMediaSchema);
