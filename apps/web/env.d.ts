/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TINYMCE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly REDIS_URL: string;
      readonly CRON_SECRET: string;
      readonly SNOWFLAKE_WORKER_ID: bigint;
      readonly SNOWFLAKE_EPOCH: Date;
      readonly HASHIDS_SALT: string;
      readonly CLOUDINARY_CLOUD_NAME: string;
      readonly CLOUDINARY_API_KEY: string;
      readonly CLOUDINARY_API_SECRET: string;
      readonly CLOUDINARY_URL: string;
      readonly GOOGLE_CLIENT_ID: string;
      readonly GOOGLE_CLIENT_SECRET: string;
      readonly GITHUB_CLIENT_ID: string;
      readonly GITHUB_CLIENT_SECRET: string;
      readonly BETTER_AUTH_SECRET: string;
      readonly BETTER_AUTH_URL: string;
      readonly EMAIL_USER: string;
      readonly EMAIL_PASS: string;
      readonly POSTGRES_USER: string;
      readonly POSTGRES_PASSWORD: string;
      readonly POSTGRES_DB: string;
      readonly NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
