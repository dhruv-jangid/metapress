# MetaPress Web Application

The main web application for MetaPress, a full-featured blogging platform built with TanStack Start, React 19, and modern web technologies.

## Overview

This is the core web application of the MetaPress platform, providing a complete blogging experience with rich content creation, user authentication, content moderation, and AI-powered features via Model Context Protocol (MCP).

## Tech Stack

### Core Framework
- **TanStack Start** - Full-stack React framework
- **TanStack Router** - Type-safe routing with file-based routes
- **React 19** - Latest React features
- **Vite** - Fast build tool and dev server
- **Nitro** - Server engine with Vercel preset

### UI & Styling
- **Tailwind CSS 4.1+** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components
- **next-themes** - Theme management (dark/light mode)
- **TipTap 3.7+** - Rich text editor

### Backend & Database
- **Better Auth** - Authentication and session management
- **Drizzle ORM** - Type-safe SQL toolkit
- **PostgreSQL** - Primary database (Neon/local)
- **Redis** - Caching layer (optional)

### Content & Media
- **Cloudinary** - Image upload and optimization
- **ONNX Runtime Web** - NSFW detection
- **Obscenity** - Profanity filtering

### AI Integration
- **@vercel/mcp-adapter** - Model Context Protocol adapter
- **@modelcontextprotocol/sdk** - MCP SDK

### Development Tools
- **TypeScript 5.9+** - Type safety
- **Vitest** - Testing framework
- **ESLint** - Code linting
- **Drizzle Kit** - Database migrations

## Project Structure

```
apps/web/
├── src/
│   ├── routes/              # TanStack Router file-based routes
│   │   ├── (auth)/          # Authentication routes
│   │   ├── (protected)/    # Protected routes
│   │   ├── api/            # API endpoints
│   │   └── __root.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── providers/      # Context providers
│   │   └── sidebar/        # Sidebar components
│   ├── server/             # Server-side logic
│   │   ├── auth/           # Authentication controllers
│   │   ├── blog/           # Blog business logic
│   │   ├── comment/        # Comment handling
│   │   ├── user/           # User management
│   │   ├── image/          # Image processing
│   │   ├── cache/          # Caching service
│   │   ├── mail/           # Email service
│   │   └── mcp/            # MCP integration
│   ├── db/                 # Database configuration
│   │   ├── schema.ts       # Drizzle schema
│   │   ├── relations.ts    # Database relations
│   │   └── index.ts        # Database connection
│   ├── lib/                # Utility libraries
│   │   ├── auth.ts         # Auth configuration
│   │   ├── redis.ts        # Redis client
│   │   ├── image/          # Image utilities
│   │   └── content/        # Content utilities
│   ├── shared/             # Shared schemas and types
│   ├── middleware/         # Route middleware
│   ├── hooks/              # Custom React hooks
│   ├── router.tsx          # Router configuration
│   └── styles.css          # Global styles
├── public/                 # Static assets
│   ├── images/            # Image assets
│   └── models/            # ML models (NSFW detection)
├── drizzle.config.ts       # Drizzle ORM configuration
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## Getting Started

### Prerequisites

- **Bun 1.3+** - Package manager and runtime
- **PostgreSQL** - Database (local or Neon)
- **Redis** (optional) - For caching
- **Cloudinary Account** - For image hosting

### Installation

From the project root:

```bash
bun install
```

### Environment Variables

Create a `.env` file in the `apps/web` directory with the following variables:

#### Required

```bash
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/metapress

# Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Optional

```bash
# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Email (for password reset, etc.)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Redis
REDIS_URL=redis://localhost:6379
# Or Upstash
KV_URL=your_redis_url
KV_REST_API_URL=your_redis_rest_url
KV_REST_API_TOKEN=your_redis_token
KV_REST_API_READ_ONLY_TOKEN=your_readonly_token

# Snowflake ID Generation
SNOWFLAKE_WORKER_ID=1
SNOWFLAKE_EPOCH=1640995200000

# Hashids
HASHIDS_SALT=your_salt_here

# Cron
CRON_SECRET=your_cron_secret
```

### Database Setup

#### Using Docker (Recommended)

From the project root:

```bash
bun docker
```

This starts PostgreSQL and Redis containers.

#### Manual Setup

1. Install PostgreSQL locally
2. Create a database:
   ```sql
   CREATE DATABASE metapress;
   ```
3. Update `DATABASE_URL` in `.env`
4. Run migrations:
   ```bash
   cd apps/web
   bun run db:push
   ```

### Development

Start the development server:

```bash
# From project root
bun dev

# Or from apps/web
cd apps/web
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

### Development

- `bun dev` - Start development server with hot reload
- `bun preview` - Preview production build locally

### Database

- `bun run db:generate` - Generate migration files
- `bun run db:migrate` - Run migrations
- `bun run db:push` - Push schema changes to database
- `bun run db:pull` - Pull schema from database
- `bun run db:studio` - Open Drizzle Studio (database GUI)

### Testing

- `bun test` - Run tests with Vitest

### Build

- `bun build` - Build for production
- `bun start` - Start production server

### Utilities

- `bun docker` - Start Docker containers (PostgreSQL, Redis)
- `bun in` - Install and update dependencies

## Features

### Content Management

- **Rich Text Editor**: TipTap with support for:
  - Text formatting (bold, italic, headings, etc.)
  - Images (upload via Cloudinary)
  - Emoji support
  - YouTube embeds
  - Text alignment
- **Content Moderation**:
  - NSFW detection using ONNX models
  - Profanity filtering
  - Character limit (50,000 per post)
- **Categories**: Organized content categorization

### User Management

- **Authentication**: Better Auth with support for:
  - Email/password
  - Google OAuth
  - GitHub OAuth
- **User Profiles**:
  - Custom usernames
  - Display names
  - Avatar uploads
- **Account Features**:
  - Email verification
  - Password reset
  - Account deletion
  - Liked posts tracking

### Admin Features

- **Dashboard**: Manage users, blogs, and comments
- **User Management**: Ban users with custom reasons and expiry
- **Role-based Access**: Admin/user separation

### Performance

- **Redis Caching**: Fast data retrieval
- **Optimized Builds**: Vite for fast development and production builds
- **Server-side Rendering**: Nitro for optimal performance

### AI Integration

- **Model Context Protocol (MCP)**: AI-powered user information retrieval
- **Multi-transport Support**: HTTP, SSE, and WebSocket endpoints

## API Routes

### Authentication

- `/api/auth/*` - Better Auth endpoints

### MCP Endpoints

- `POST /api/mcp/http` - HTTP transport
- `GET /api/mcp/sse` - Server-Sent Events transport
- `WS /api/mcp/ws` - WebSocket transport

### Cron Jobs

- `/api/cron/*` - Scheduled tasks

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set all required environment variables
3. Deploy automatically on push

The Nitro preset is configured for Vercel, so deployment is seamless.

### Other Platforms

- **Railway**: Supports PostgreSQL and Redis
- **Render**: Full-stack deployment support
- **DigitalOcean App Platform**: Complete platform support

## Development Guidelines

### Code Style

- Use TypeScript for all files
- Follow React best practices
- Use TanStack Router conventions for routing
- Implement proper error handling

### Database

- Use Drizzle ORM for all database operations
- Keep schema in `src/db/schema.ts`
- Run `db:push` for schema changes during development
- Use migrations for production

### Components

- Use shadcn/ui components when possible
- Keep components in `src/components/`
- Separate UI components from business logic

### Server Logic

- Keep server-side logic in `src/server/`
- Use controllers for route handlers
- Implement services for business logic
- Use repositories for data access

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check Docker containers if using Docker

### Build Errors

- Clear `.next` and `.turbo` directories
- Run `bun install` again
- Check TypeScript errors with `bun run check-types`

### Auth Issues

- Verify `BETTER_AUTH_SECRET` is set
- Check `BETTER_AUTH_URL` matches your domain
- Ensure OAuth credentials are correct if using OAuth

## Contributing

See the main [README.md](../../README.md) for contribution guidelines.

## License

MIT License - see the main repository for details.
