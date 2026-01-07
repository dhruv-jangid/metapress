import { DomainError } from "@/shared/errors/domain-error";

type ImageErrorCode = "FETCH_FAILED" | "DELETE_FAILED" | "DELETE_MANY_FAILED";

export class ImageError extends DomainError {
  constructor(code: ImageErrorCode, cause?: unknown) {
    super("IMAGE", code, cause);
    this.name = "ImageError";
  }
}

export const handleImageError = (error: ImageError) => {
  switch (error.code) {
    case "FETCH_FAILED":
      throw new Error("Failed to fetch comments");

    case "DELETE_FAILED":
      throw new Error("Failed to delete image");

    case "DELETE_MANY_FAILED":
      throw new Error("Failed to delete multiple images");

    default:
      throw new Error("Something went wrong");
  }
};
