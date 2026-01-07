import { v2 as cloudinary } from "cloudinary";

import { ImageError } from "./image.error";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({ cloud_name, api_key, api_secret });

export class ImageService {
  static getSignature(data: GetImageSignature) {
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
      throw new ImageError("FETCH_FAILED", error);
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

  static async delete({ publicId }: DeleteImage) {
    try {
      await cloudinary.uploader.destroy(publicId, {
        invalidate: true,
      });
    } catch (error) {
      throw new ImageError("DELETE_FAILED", error);
    }
  }

  static async deleteMany({ publicIds }: DeleteManyImages) {
    try {
      await cloudinary.api.delete_resources(publicIds, {
        invalidate: true,
      });
    } catch (error) {
      throw new ImageError("DELETE_MANY_FAILED", error);
    }
  }
}
