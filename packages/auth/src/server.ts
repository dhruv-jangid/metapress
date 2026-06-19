import { db } from "@metapress/db";
import * as schema from "@metapress/db/schema";
import { env } from "@metapress/env/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { admin, openAPI, username } from "better-auth/plugins";

import { changeEmailConfirmationText } from "./mail-texts/change-email-confirmation";
import { deleteAccountVerificationText } from "./mail-texts/delete-account-verification";
import { resetPasswordText } from "./mail-texts/reset-password";
import { verificationEmailText } from "./mail-texts/verification-email";

export const createAuth = ({
  onSendMail,
  onCacheGet,
  onCacheSet,
  onCacheDel,
  onCacheBFAdd,
}: {
  onSendMail: (data: { to: string; subject: string; text: string }) => Promise<void>;
  onCacheGet: (key: string) => Promise<string | null>;
  onCacheSet: (key: string, value: string, ttl?: number) => Promise<void>;
  onCacheDel: (key: string) => Promise<void>;
  onCacheBFAdd: (value: string) => Promise<void>;
}) => {
  return betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.CORS_ORIGIN],
    basePath: "/api/auth",
    database: drizzleAdapter(db, { provider: "pg", schema, usePlural: true }),
    appName: "MetaPress",
    account: { encryptOAuthTokens: true },
    advanced: {
      cookiePrefix: "metapress",
      database: { generateId: false },
    },
    user: {
      changeEmail: {
        enabled: true,
        sendChangeEmailConfirmation: async ({ user: { name, email }, url, newEmail }) => {
          await onSendMail({
            subject: "Confirm your new email address",
            to: email,
            text: changeEmailConfirmationText({ name, newEmail, url }),
          });
        },
      },
      deleteUser: {
        enabled: true,
        deleteTokenExpiresIn: 60 * 60,
        sendDeleteAccountVerification: async ({ user: { name, email, createdAt }, url }) => {
          const diffInHours = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60);
          if (diffInHours < 24) {
            throw new APIError("TOO_EARLY", { message: "Try again later" });
          }

          await onSendMail({
            to: email,
            subject: "Delete your MetaPress account",
            text: deleteAccountVerificationText({ name, url }),
          });
        },
      },
      additionalFields: {
        username: { type: "string" },
        role: { type: "string", input: false },
        banned: { type: "boolean", input: false },
      },
    },
    databaseHooks: {
      user: {
        create: {
          after: async ({ username }) => {
            try {
              if (username) {
                await onCacheBFAdd(String(username).toLowerCase());
              }
            } catch (error) {
              console.error("Failed to add username to cache:", error);
            }
          },
        },
      },
    },
    emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      requireEmailVerification: true,
      revokeSessionsOnPasswordReset: true,
      sendResetPassword: async ({ user: { name, email }, url }) => {
        await onSendMail({
          to: email,
          subject: "Reset your MetaPress password",
          text: resetPasswordText({ name, url }),
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user: { name, email }, url }) => {
        await onSendMail({
          to: email,
          subject: "Verify your MetaPress email",
          text: verificationEmailText({ name, url }),
        });
      },
    },
    socialProviders: {
      github: {
        clientId: env.GITHUB_CLIENT_ID,
        clientSecret: env.GITHUB_CLIENT_SECRET,
        mapProfileToUser: ({ id }) => {
          return {
            username: `${id}_gb`,
          };
        },
      },
      google: {
        prompt: "select_account",
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        mapProfileToUser: ({ sub }) => {
          return {
            username: `${sub}_gl`,
          };
        },
      },
    },
    secondaryStorage: {
      get: async (key) => {
        return await onCacheGet(key);
      },
      set: async (key, value, ttl) => {
        if (ttl && ttl > 0) {
          await onCacheSet(key, value, ttl);
        } else {
          await onCacheSet(key, value);
        }
      },
      delete: async (key) => {
        await onCacheDel(key);
      },
    },
    rateLimit: {
      customRules: {
        "/sign-up/email": { window: 10, max: 3 },
        "/sign-in/email": { window: 10, max: 3 },
        "/forget-password": { window: 3600, max: 1 },
        "/reset-password": { window: 3600, max: 1 },
        "/reset-password/*": { window: 3600, max: 1 },
        "/update-user": { window: 3600, max: 3 },
      },
    },
    session: { cookieCache: { enabled: true } },
    onAPIError: { throw: true },
    telemetry: { enabled: false },
    plugins: [
      openAPI({ theme: "alternate" }),
      username(),
      admin({
        bannedUserMessage: "You have been banned from MetaPress",
        defaultBanExpiresIn: 60 * 60 * 24 * 7,
      }),
    ],
  });
};
