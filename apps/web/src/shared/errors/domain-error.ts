type Domain = "BLOG" | "USER" | "COMMENT" | "GENERAL" | "IMAGE" | "MAIL" | "MCP";

export abstract class DomainError extends Error {
  readonly domain: Domain;
  readonly code: string;
  readonly cause?: unknown;

  protected constructor(domain: Domain, code: string, cause?: unknown) {
    super(`${domain}:${code}`);
    this.domain = domain;
    this.code = code;
    this.cause = cause;
    this.name = "DomainError";
  }
}
