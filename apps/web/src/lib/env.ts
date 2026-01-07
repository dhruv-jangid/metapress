import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  REDIS_URL: z.string(),
  CRON_SECRET: z.string(),
  SNOWFLAKE_WORKER_ID: z.bigint(),
  SNOWFLAKE_EPOCH: z.date(),
  HASHIDS_SALT: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  CLOUDINARY_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  EMAIL_USER: z.string(),
  EMAIL_PASS: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

const clientEnvSchema = z.object({
  VITE_TINYMCE_API_KEY: z.string(),
});

export const serverEnv = envSchema.parse(process.env);

export const clientEnv = clientEnvSchema.parse(import.meta.env);

const requiredServerEnv = [
  "DATABASE_URL",
  "REDIS_URL",
  "CRON_SECRET",
  "SNOWFLAKE_WORKER_ID",
  "SNOWFLAKE_EPOCH",
  "HASHIDS_SALT",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
  "CLOUDINARY_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GITHUB_CLIENT_ID",
  "GITHUB_CLIENT_SECRET",
  "BETTER_AUTH_SECRET",
  "BETTER_AUTH_URL",
  "EMAIL_USER",
  "EMAIL_PASS",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "NODE_ENV",
] as const;

const requiredClientEnv = ["VITE_TINYMCE_API_KEY"] as const;

for (const key of requiredServerEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

for (const key of requiredClientEnv) {
  if (!import.meta.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
