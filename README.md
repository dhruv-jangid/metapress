# MetaPress

MetaPress is a full-stack blogging and publishing platform for writing, publishing, reading, liking, and discussing long-form content.

Live site: [https://metapress.vercel.app](https://metapress.vercel.app)

## Features

- Rich blog editor powered by TipTap with slash commands, images, tables, task lists, embeds, code blocks, and formatted content.
- Blog publishing flow with title/category validation, preview, Cloudinary image upload, and image cleanup on failed uploads.
- Auth with Better Auth, including email/password, email verification, password reset, Google OAuth, GitHub OAuth, username support, and admin support.
- Protected reader/writer experience with browse, feed, create blog, edit blog, profile, liked blogs, and blog detail pages.
- User profiles with published blogs.
- Likes and comments for authenticated users.
- Cloudinary-backed media signing and deletion.
- Redis-backed caching for blogs, comments, likes, feed data, user data, and username availability.
- PostgreSQL database schema managed through Drizzle ORM.
- Type-safe API contracts shared between the server and web app through ORPC and Zod.
- OpenAPI reference generated from the ORPC router.

## Tech Stack

- Runtime/package manager: Bun
- Monorepo: Turborepo and Bun workspaces
- Frontend: SvelteKit 5, Svelte, Tailwind CSS, shadcn-svelte/Bits UI components
- Backend: Elysia, ORPC, Bun
- Auth: Better Auth
- Database: PostgreSQL, Drizzle ORM, Drizzle Kit
- Cache: Redis
- Media: Cloudinary
- Email: Nodemailer
- Editor: TipTap
- Validation: Zod
- Logging: LogTape
- Tooling: Oxlint, Oxfmt, Lefthook

## Project Structure

```text
metapress/
├── apps/
│   ├── server/       # Bun + Elysia API server
│   └── web/          # SvelteKit web application
├── packages/
│   ├── api/          # Shared ORPC contracts and Zod schemas
│   ├── auth/         # Better Auth server and web helpers
│   ├── config/       # Shared TypeScript configuration
│   ├── db/           # Drizzle client, schema, and database scripts
│   ├── editor/       # TipTap editor setup and extensions
│   ├── env/          # Server environment validation
│   └── logger/       # LogTape logging helpers
├── scripts/          # Repository maintenance scripts
├── package.json      # Root scripts and workspace config
└── turbo.json        # Turborepo task pipeline
```

## Prerequisites

- Bun `1.3.14` or newer compatible version
- Docker and Docker Compose for local PostgreSQL and Redis
- Cloudinary account and API credentials
- Google OAuth credentials
- GitHub OAuth credentials
- Email account/app password for Nodemailer

## Environment Variables

Create the web environment file at `apps/web/.env`:

```env
PUBLIC_SERVER_URL=http://localhost:3000
```

Create the server environment file at `apps/server/.env`:

```env
DATABASE_URL=postgres://metapress:metapress@localhost:5432/metapress
BETTER_AUTH_SECRET=replace-with-at-least-32-characters
BETTER_AUTH_URL=http://localhost:3000
REDIS_URL=redis://localhost:6379
CRON_SECRET=replace-with-a-secret-value
SNOWFLAKE_WORKER_ID=1
SNOWFLAKE_EPOCH=2024-01-01T00:00:00.000Z
HASHIDS_SALT=replace-with-a-secret-value
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_URL=cloudinary://your-api-key:your-api-secret@your-cloud-name
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-app-password
POSTGRES_USER=metapress
POSTGRES_PASSWORD=metapress
POSTGRES_DB=metapress
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

The database scripts also need the same server environment values available when they run. If your shell or task runner does not load `apps/server/.env` for `packages/db`, export the variables in your shell or add an equivalent local env file for the database package.

## Local Development

Install dependencies:

```bash
bun install
```

Start local PostgreSQL and Redis:

```bash
bun run db:start
```

Push the Drizzle schema to the database:

```bash
bun run db:push
```

Start the web app and API server:

```bash
bun run dev
```

Open the app at [http://localhost:5173](http://localhost:5173).

The API runs at [http://localhost:3000/api](http://localhost:3000/api).

The API reference is available at [http://localhost:3000/api/reference](http://localhost:3000/api/reference).

## Scripts

| Command                          | Description                                                 |
| -------------------------------- | ----------------------------------------------------------- |
| `bun run dev`                    | Start all apps in development mode through Turborepo.       |
| `bun run start`                  | Start built apps through Turborepo.                         |
| `bun run build`                  | Build all apps and packages.                                |
| `bun run check-types`            | Run TypeScript checks across the workspace.                 |
| `bun run dev:web`                | Start only the SvelteKit web app.                           |
| `bun run dev:server`             | Start only the Bun/Elysia API server.                       |
| `bun run db:start`               | Start local PostgreSQL and Redis with Docker Compose.       |
| `bun run db:watch`               | Run Docker Compose in the foreground.                       |
| `bun run db:stop`                | Stop local database/cache containers.                       |
| `bun run db:down`                | Stop and remove local database/cache containers.            |
| `bun run db:push`                | Push Drizzle schema changes to the database.                |
| `bun run db:generate`            | Generate Drizzle migration files.                           |
| `bun run db:migrate`             | Run Drizzle migrations.                                     |
| `bun run db:studio`              | Open Drizzle Studio.                                        |
| `bun run check`                  | Run Oxlint and Oxfmt.                                       |
| `bun run cache:flush`            | Flush Redis cache data.                                     |
| `bun run cache:warmup:likes`     | Warm Redis like counters and liked-blog cache.              |
| `bun run cache:warmup:usernames` | Warm username cache from the database.                      |
| `bun run clean`                  | Remove dependencies, caches, lockfile, and build artifacts. |

`bun run clean` is destructive. It removes `node_modules`, `.turbo`, `bun.lock`, server build output, and SvelteKit/Vercel build folders.

## Application Routes

- Public pages: `/`, `/about`, `/contact`, `/policies`, `/callback/oauth`.
- Auth pages: `/sign-in`, `/sign-up`, `/forget-password`, `/reset-password`.
- Protected pages: `/browse`, `/feed`, `/create-blog`, `/edit-blog/[blogid]`, `/[username]`, `/[username]/[blogid]`, `/account/profile`, `/account/liked`.
- Admin page: `/admin/dashboard`.

## API Domains

- `blog`: feed, detail, create, update, delete, like, unlike.
- `comment`: list, create, delete.
- `media`: Cloudinary upload signature and bulk delete.
- `user`: contact, newsletter subscription, profile with blogs, liked blogs.
- `auth`: Better Auth endpoints mounted under `/api/auth/*`.

## Database

The database package uses Drizzle ORM with PostgreSQL. The schema includes:

- `users`, `sessions`, `accounts`, and `verifications` for Better Auth.
- `blogs` and `blog_images` for published content and Cloudinary assets.
- `comments` for blog discussions.
- `likes` with a composite key of `userId` and `blogId`.

IDs are generated as Snowflake strings and public blog IDs are encoded with Hashids.

## Deployment Notes

- The web app uses `@sveltejs/adapter-vercel` and is configured for Vercel deployment.
- The API server is a Bun/Elysia app that listens on port `3000`.
- Set `PUBLIC_SERVER_URL` in the web deployment to the deployed API origin.
- Set `BETTER_AUTH_URL` to the deployed API origin.
- Set `CORS_ORIGIN` to the deployed web origin, for example `https://metapress.vercel.app`.
- Production cookies are configured as secure and `sameSite: none`, so HTTPS is required.
