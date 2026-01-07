# MetaPress: The Pulse of Creativity

A next-gen, full-featured blogging platform built with TanStack Start, React 19, Bun, and Turborepo. Features rich text editing, advanced user authentication, content moderation, admin management, and Model Context Protocol (MCP) AI integration. Now at **v2.0.0**.

## Overview

MetaPress is a comprehensive, scalable blogging platform for creators and readers. Built with the latest web technologies, it offers seamless content creation, advanced moderation, robust user management, and AI-powered insights via MCP. The platform is optimized for speed, security, and developer experience.

### Key Highlights

- **Modern Tech Stack**: TanStack Start, TanStack Router, React 19, Bun, Turborepo, TypeScript
- **Rich Content Creation**: TipTap editor, image/media support, emoji, YouTube embeds
- **User Experience**: Responsive UI, dark/light mode, fast navigation
- **Security & Moderation**: NSFW detection, profanity filtering, role-based access
- **Scalable & Performant**: Redis caching, optimized builds, Docker support
- **MCP AI Integration**: Model Context Protocol for user info and AI features
- **Admin Management**: Full dashboard, user/content controls
- **Monorepo Structure**: Turbo-powered multi-app setup

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Database & Docker](#database--docker)
- [MCP Integration](#mcp-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

### Content Management

- **TipTap Editor**: Rich text, images, emoji, YouTube embeds
- **Cloudinary Integration**: Image upload, optimization, NSFW detection
- **Categories**: Predefined, organized content
- **Profanity & NSFW Filtering**: Automatic moderation
- **Character Limit**: 50,000 per post, live counter

### User Management

- **Better Auth**: Email/password, Google, GitHub OAuth
- **Profiles**: Custom usernames, display names, avatars
- **Email Verification & Reset**: Secure flows
- **Account Controls**: Change email, delete, manage settings
- **Liked Posts**: Track favorites

### Admin Features

- **Dashboard**: Manage users, blogs, comments
- **User Banning**: Custom reasons, expiry
- **Role-based Access**: Admin/user separation

### User Experience

- **Responsive UI**: Mobile-first, Tailwind CSS
- **Dark/Light Mode**: next-themes
- **Interactive**: Likes, comments, search, category browsing
- **Caching**: Redis for speed
- **Real-time**: Live validation, character count
- **About/Contact**: Professional pages

### Security & Safety

- **NSFW Detection**: TensorFlow.js, NSFWJS
- **Profanity Filtering**: Obscenity lib
- **Input Validation**: Zod schemas
- **JWT Sessions**: Secure cookies
- **Rate Limiting**: Anti-spam

### MCP AI Integration

- **Model Context Protocol**: AI user info, multi-transport (HTTP, SSE, WS)
- **Vercel MCP Adapter**: Production-ready

## Tech Stack

### Frontend

- **TanStack Start** (Full-stack React framework)
- **TanStack Router** (Type-safe routing)
- **React 19**
- **Vite** (Build tool)
- **Nitro** (Server engine, Vercel preset)
- **TypeScript 5.9+**
- **Tailwind CSS 4.1+**
- **shadcn/ui** (Radix UI)
- **TipTap 3.7+**
- **next-themes** (Theme management)

### Backend & Database

- **Better Auth**
- **Drizzle ORM**
- **PostgreSQL** (Neon/local)
- **Redis**
- **Drizzle Kit**

### Content & Media

- **Cloudinary**
- **TensorFlow.js**, **NSFWJS**
- **Obscenity**

### AI & Integration

- **@modelcontextprotocol/sdk**
- **@vercel/mcp-adapter**

### Dev & Build

- **Bun 1.3+**
- **Turborepo 2.6+**
- **Husky**
- **ESLint**
- **Zod**

### Email & Notifications

- **Nodemailer**
- **Sonner**

## Getting Started

### Prerequisites

- Bun 1.3+ installed
- PostgreSQL (local/Neon)
- Redis (optional)
- Cloudinary account

### Installation

```bash
bun install
```

Run the dev server:

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```bash
metapress/
├── apps/
│   └── web/                 # Main web application
│       ├── src/
│       │   ├── routes/      # TanStack Router routes
│       │   ├── components/  # UI components, providers, sidebar
│       │   ├── server/      # Server-side logic (auth, blog, cache, etc.)
│       │   ├── db/          # Database schema, relations, drizzle config
│       │   ├── hooks/       # Custom React hooks
│       │   ├── lib/         # Utilities, content, image processing
│       │   ├── middleware/  # Route middleware
│       │   ├── shared/      # Shared schemas and types
│       │   ├── router.tsx   # Router configuration
│       │   └── styles.css   # Global styles
│       ├── public/          # Static assets (images, models)
│       ├── drizzle.config.ts
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
├── bunfig.toml              # Bun configuration
├── package.json             # Root package.json (monorepo)
├── turbo.json               # Turborepo configuration
└── vercel.json              # Vercel deployment config
```

## Environment Variables

Create a `.env` file at the root:

### Required

```bash
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/metapress
# Or Neon:
POSTGRES_URL=postgresql://username:password@host:port/database

# Auth
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
```

### Optional

```bash
# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Redis
REDIS_URL=redis://localhost:6379
# Or Upstash:
KV_URL=your_redis_url
KV_REST_API_URL=your_redis_rest_url
KV_REST_API_TOKEN=your_redis_token
KV_REST_API_READ_ONLY_TOKEN=your_readonly_token
```

### Docker

```bash
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=metapress
```

### Setup

1. Copy `.env.example` to `.env` (if available)
2. Fill required vars
3. Use Docker for local dev
4. Use managed DB/cache for prod

## Scripts

- `bun dev` - Start development server (Vite)
- `bun build` - Production build
- `bun start` - Start production server
- `bun check-types` - TypeScript type checking
- `bun docker` - Start DB/cache containers (if docker-compose.yml exists)
- `bun clean` - Clean build artifacts
- `bun in` - Install and update all dependencies

## Database & Docker

### Docker (Recommended)

Start DB/cache:

```bash
bun docker
```

Run migrations:

```bash
cd apps/web
bun drizzle-kit push
```

### Local (No Docker)

1. Install PostgreSQL
2. Create database `metapress`
3. Update `.env` with `DATABASE_URL`
4. Run migrations as above

### Production (Neon/Other)

1. Create DB
2. Get connection string
3. Update `.env`
4. Run migrations

## Docker Setup

If you have a `docker-compose.yml` file in `apps/web/`, you can use it for local PostgreSQL/Redis:

- **PostgreSQL**: Port 5432
- **Redis**: Port 6379

Start:

```bash
bun docker
# or manually:
docker compose -f apps/web/docker-compose.yml up -d
```

Stop:

```bash
docker compose -f apps/web/docker-compose.yml down
```

View logs:

```bash
docker compose -f apps/web/docker-compose.yml logs -f
```

**Note**: If you don't have a docker-compose.yml file, you can create one or use a managed database service like Neon for PostgreSQL and Upstash for Redis.

## MCP Integration

MetaPress uses Model Context Protocol (MCP) for AI-powered user info and tools.

### Tool: getUserInfo

Get user details by username (3-30 chars, lowercase, alphanumeric/underscores).

**Returns:**

- Display name
- Username
- Join date
- Total blogs
- Total likes
- Role (ADMIN/USER)

### Endpoints

- HTTP: `POST /api/mcp/http`
- SSE: `GET /api/mcp/sse`
- WebSocket: `WS /api/mcp/ws`

### Example

```ts
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
const client = new Client({ name: "metapress-client", version: "2.0.0" });
const result = await client.callTool({
  name: "getUserInfo",
  arguments: { username: "johndoe" },
});
```

### Development

- Handler: `apps/web/src/routes/api/mcp/$.ts`
- Schema: `apps/web/src/server/mcp/mcp.schema.ts`

## Deployment

### Vercel (Recommended)

1. Connect repo to Vercel
2. Set env vars
3. Deploy on push
4. MCP endpoints auto-enabled

### Other Platforms

- **Railway**: PG/Redis support
- **Render**: Full-stack
- **DigitalOcean App Platform**

### Production Env

Set all required env vars:

- DB connection (DATABASE_URL/POSTGRES_URL)
- Cloudinary creds
- Auth secrets
- Redis (optional)
- OAuth (optional)
- Email (optional)

### Build

- **Vite** for development and production builds
- **Nitro** for server-side rendering and API routes
- **Bun** as package manager and runtime
- **Turborepo** for monorepo task orchestration

## Contributing

1. Fork repo
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m 'Add feature'`
4. Push: `git push origin feature/your-feature`
5. Open PR

### Guidelines

- TypeScript best practices
- Conventional commits
- Pass all tests
- Update docs
- Use Vite for development
- Test on multiple devices
- Follow TanStack Router conventions

## License

MIT - see [LICENSE](LICENSE)

## Acknowledgments

- [Better Auth](https://www.better-auth.com/)
- [TipTap](https://tiptap.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Cloudinary](https://cloudinary.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vercel](https://vercel.com/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Vite](https://vitejs.dev/)
- [Nitro](https://nitro.unjs.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Bun](https://bun.sh/)

---

---

**Version**: 2.0.0  
**Author**: dhruvjangid  
**Description**: The Pulse of Creativity

For questions/support, visit [Contact](/contact) or open a GitHub issue.
