import { notFound } from "@tanstack/react-router";

import { DomainError } from "@/shared/errors/domain-error";

type UserErrorCode = "NOT_FOUND" | "FETCH_FAILED";

export class UserError extends DomainError {
  constructor(code: UserErrorCode, cause?: unknown) {
    super("USER", code, cause);
    this.name = "UserError";
  }
}

export const handleUserError = (error: UserError) => {
  switch (error.code) {
    case "NOT_FOUND":
      throw notFound();

    case "FETCH_FAILED":
      throw new Error("Failed to fetch user");

    default:
      throw new Error("Something went wrong");
  }
};
