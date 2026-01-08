import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/middleware/auth";
import { handleImageError, ImageError } from "./image.error";
import { DeleteImageSchema, DeleteImagesSchema, GetImageSignatureSchema } from "./image.schema";
import { ImageService } from "./image.service";

export const getImageSignature = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(GetImageSignatureSchema)
  .handler(async ({ data }) => {
    try {
      const asset_folder = `metapress/${!data.isUser ? "blogs" : "users"}`;
      const timestamp = String(Math.floor(Date.now() / 1000));
      const transformation = `${!data.isUser ? "g_auto" : "ar_1:1,g_faces"},f_webp,q_auto:low,c_auto`;

      return await ImageService.getSignature({
        ...data,
        asset_folder,
        timestamp,
        transformation,
      });
    } catch (error) {
      if (error instanceof ImageError) {
        handleImageError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const deleteImage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(DeleteImageSchema)
  .handler(async ({ data }) => {
    try {
      await ImageService.delete(data);
    } catch (error) {
      if (error instanceof ImageError) {
        handleImageError(error);
      }
      throw new Error("Something went wrong");
    }
  });

export const deleteImages = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator(DeleteImagesSchema)
  .handler(async ({ data }) => {
    try {
      await ImageService.deleteMany(data);
    } catch (error) {
      if (error instanceof ImageError) {
        handleImageError(error);
      }
      throw new Error("Something went wrong");
    }
  });
