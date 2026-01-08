export function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object"
    && error !== null
    && "code" in error
    && (error as any).code === "23505"
  );
}
