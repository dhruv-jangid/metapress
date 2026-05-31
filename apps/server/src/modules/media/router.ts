import { protectedProcedure } from "@/lib/orpc";

import { MediaService } from "./service";

export const getMediaSignature = protectedProcedure.media.getSignature.handler(
  async ({ input }) => {
    const asset_folder = `metapress/${!input.isUser ? "blogs" : "users"}`;
    const timestamp = String(Math.floor(Date.now() / 1000));
    const transformation = `${!input.isUser ? "g_auto" : "ar_1:1,g_faces"},f_webp,q_auto:low,c_auto`;

    return MediaService.getSignature({ ...input, asset_folder, timestamp, transformation });
  },
);

export const deleteManyMedia = protectedProcedure.media.deleteMany.handler(async ({ input }) => {
  return await MediaService.deleteMany(input);
});
