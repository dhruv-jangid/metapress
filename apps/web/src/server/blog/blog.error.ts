import { notFound } from "@tanstack/react-router";
import { DomainError } from "@/shared/errors/domain-error";

type BlogErrorCode =
  | "NOT_FOUND"
  | "ALREADY_EXISTS"
  | "FETCH_FAILED"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED";

export class BlogError extends DomainError {
  constructor(code: BlogErrorCode, cause?: unknown) {
    super("BLOG", code, cause);
    this.name = "BlogError";
  }
}

export const handleBlogError = (error: BlogError) => {
  switch (error.code) {
    case "NOT_FOUND":
      throw notFound();

    case "ALREADY_EXISTS":
      throw new Error("Blog already exists");

    case "FETCH_FAILED":
      throw new Error("Failed to fetch blog");

    case "CREATE_FAILED":
      throw new Error("Failed to create blog");

    case "UPDATE_FAILED":
      throw new Error("Failed to update blog");

    case "DELETE_FAILED":
      throw new Error("Failed to delete blog");

    default:
      throw new Error("Something went wrong");
  }
};
