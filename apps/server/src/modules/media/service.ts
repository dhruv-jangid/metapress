import type { DeleteMediaInput } from "@metapress/api/schemas/media";
import { env } from "@metapress/env/server";
import { ORPCError } from "@orpc/server";
import { v2 as cloudinary } from "cloudinary";

import type { GetMediaSignatureInput } from "./types";

const cloud_name = env.CLOUDINARY_CLOUD_NAME;
const api_key = env.CLOUDINARY_API_KEY;
const api_secret = env.CLOUDINARY_API_SECRET;

cloudinary.config({ cloud_name, api_key, api_secret });

export abstract class MediaService {
  static getSignature(data: GetMediaSignatureInput) {
    let signature;
    try {
      signature = cloudinary.utils.api_sign_request(
        {
          asset_folder: data.asset_folder,
          timestamp: data.timestamp,
          transformation: data.transformation,
        },
        api_secret,
      );
    } catch (error) {
      throw new ORPCError("FETCH_FAILED", error as Error);
    }

    return {
      cloudName: cloud_name,
      apiKey: api_key,
      timestamp: data.timestamp,
      signature,
      asset_folder: data.asset_folder,
      transformation: data.transformation,
    };
  }

  static async delete(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
      });
    } catch (error) {
      throw new ORPCError("DELETE_FAILED", error as Error);
    }
  }

  static async deleteMany({ publicIds }: DeleteMediaInput) {
    try {
      await cloudinary.api.delete_resources(publicIds, {
        invalidate: true,
      });
    } catch (error) {
      throw new ORPCError("DELETE_MANY_FAILED", error as Error);
    }
  }
}
