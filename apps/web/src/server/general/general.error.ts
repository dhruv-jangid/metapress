import { DomainError } from "@/shared/errors/domain-error";

type GeneralErrorCode = "NOT_FOUND" | "FETCH_FAILED";

export class GeneralError extends DomainError {
  constructor(code: GeneralErrorCode, cause?: unknown) {
    super("GENERAL", code, cause);
    this.name = "GeneralError";
  }
}

export const handleGeneralError = (error: GeneralError) => {
  switch (error.code) {
    case "NOT_FOUND":
      throw new Error("Comment not found");

    case "FETCH_FAILED":
      throw new Error("Failed to fetch comments");

    default:
      throw new Error("Something went wrong");
  }
};
