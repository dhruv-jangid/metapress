import { DomainError } from "@/shared/errors/domain-error";

type CommentErrorCode =
  | "NOT_FOUND"
  | "ALREADY_EXISTS"
  | "FETCH_FAILED"
  | "CREATE_FAILED"
  | "UPDATE_FAILED"
  | "DELETE_FAILED";

export class CommentError extends DomainError {
  constructor(code: CommentErrorCode, cause?: unknown) {
    super("COMMENT", code, cause);
    this.name = "CommentError";
  }
}

export const handleCommentError = (error: CommentError) => {
  switch (error.code) {
    case "NOT_FOUND":
      throw new Error("Comment not found");

    case "ALREADY_EXISTS":
      throw new Error("Comment already exists");

    case "FETCH_FAILED":
      throw new Error("Failed to fetch comments");

    case "CREATE_FAILED":
      throw new Error("Failed to create comment");

    case "UPDATE_FAILED":
      throw new Error("Failed to update comment");

    case "DELETE_FAILED":
      throw new Error("Failed to delete comment");

    default:
      throw new Error("Something went wrong");
  }
};
