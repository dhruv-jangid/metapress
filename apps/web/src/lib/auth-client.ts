import { PUBLIC_SERVER_URL } from "$env/static/public";
import { createAuthClient } from "@metapress/auth/web";

export const authClient = createAuthClient(PUBLIC_SERVER_URL);

export type UserSession = typeof authClient.$Infer.Session.user;
