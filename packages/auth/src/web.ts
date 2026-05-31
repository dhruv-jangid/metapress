import { adminClient, inferAdditionalFields, usernameClient } from "better-auth/client/plugins";
import { createAuthClient as cAC } from "better-auth/svelte";

export const createAuthClient = (baseURL: string) => {
  return cAC({
    baseURL,
    basePath: "/api/auth",
    plugins: [
      adminClient(),
      usernameClient(),
      inferAdditionalFields({
        user: {
          username: { type: "string" },
          role: { type: "string", input: false },
          banned: { type: "boolean", input: false },
        },
      }),
    ],
  });
};
