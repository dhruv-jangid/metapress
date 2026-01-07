import { DomainError } from "@/shared/errors/domain-error";

type MailErrorCode = "SEND_FAILED";

export class MailError extends DomainError {
  constructor(code: MailErrorCode, cause?: unknown) {
    super("MAIL", code, cause);
    this.name = "MailError";
  }
}

export const handleMailError = (error: MailError) => {
  switch (error.code) {
    case "SEND_FAILED":
      throw new Error("Failed to send email");

    default:
      throw new Error("Something went wrong");
  }
};
