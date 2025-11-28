# Skyrim Achievement Tracker

A production-grade achievement tracking system themed after The Elder Scrolls V: Skyrim. Built with Next.js 16, React 19, and bleeding-edge technologies.

## Features

- **Public Achievement List**: Beautiful, read-only view of all Skyrim achievements with real-time progress tracking
- **Admin Dashboard**: Protected admin interface to toggle achievement completion status
- **Optimistic UI**: Instant feedback on achievement toggles using React's `useOptimistic` hook
- **Immersive Skyrim Theme**: Authentic RPG-style design with custom fonts, colors, and textures
- **Secure Authentication**: Environment-based admin credentials with JWT sessions
- **Server-First Architecture**: Leverages Next.js 16 Server Components and Server Actions

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19)
- **Styling**: Tailwind CSS v4 (Beta - CSS variables, `@theme` syntax)
- **Database**: Neon (PostgreSQL via HTTP/Serverless)
- **ORM**: Drizzle ORM
- **Language**: TypeScript (Strict mode)
- **Icons**: Lucide React
- **Auth**: JWT with jose + bcryptjs

## Project Structure

```
src/
├── app/
│   ├── (public)/           # Public routes (home page)
│   ├── (admin)/            # Admin routes (login, dashboard)
│   ├── layout.tsx
│   └── globals.css
├── actions/                # Server Actions
│   ├── auth.ts
│   └── achievements.ts
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── SkyrimCheckbox.tsx
│   │   └── ProgressBar.tsx
│   └── AchievementCard.tsx
├── db/                     # Database config
│   ├── index.ts
│   └── schema.ts
├── lib/                    # Utilities
│   ├── auth.ts
│   └── utils.ts
└── data/
    └── achievements.json   # Static achievement data
```

## Setup Instructions

### 1. Clone and Install

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Then configure:

```env
DATABASE_URL=postgresql://user:password@your-neon-instance.neon.tech/dbname?sslmode=require
ADMIN_USER=admin
ADMIN_PASS=your_secure_password
JWT_SECRET=your_jwt_secret_key
```

**Generate a secure JWT secret:**

```bash
openssl rand -base64 32
```

### 3. Database Setup

Push the schema to your Neon database:

```bash
pnpm db:push
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public achievement list.

### 5. Access Admin Dashboard

Navigate to [http://localhost:3000/login](http://localhost:3000/login) and use your admin credentials.

## Architecture Highlights

### Clean Code Conventions

- **Route Groups**: Organized with `(public)` and `(admin)` groups for logical separation without affecting URLs
- **Server Components by Default**: All components are Server Components unless client interactivity is required
- **Client Components at Leaves**: Only interactive components like `SkyrimCheckbox` use `'use client'`
- **Container/Presenter Pattern**: Server components fetch data, client components handle interactions
- **Strict TypeScript**: All props explicitly typed with interfaces
- **Kebab-case**: Files and folders use `kebab-case`, components use `PascalCase`

### Key Features

#### Optimistic UI Updates

The `SkyrimCheckbox` component uses React 19's `useOptimistic` hook for zero-latency perceived updates:

```tsx
const [optimisticChecked, setOptimisticChecked] = useOptimistic(
  isChecked,
  (_, newState: boolean) => newState
);
```

#### Secure Authentication

- JWT sessions stored in HTTP-only cookies
- Middleware protection for admin routes
- Bcrypt-compatible password validation

#### Real-time Progress Calculation

Server-side progress calculation with automatic revalidation after achievement toggles.

## Database Schema

```sql
CREATE TABLE achievement_status (
  id VARCHAR(50) PRIMARY KEY,
  achievement_id VARCHAR(50) UNIQUE NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

## Styling

The project uses Tailwind CSS v4 with custom Skyrim-themed CSS variables:

- **Fonts**: Cinzel (headings), Inter (body)
- **Colors**: Gold, dark brown, parchment tones
- **Effects**: Texture overlays, custom scrollbars, gradient borders

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all `.env` variables are set in your deployment platform:

- `DATABASE_URL`
- `ADMIN_USER`
- `ADMIN_PASS`
- `JWT_SECRET`

## Contributing

This is a demonstration project showcasing production-grade Next.js 16 architecture and best practices.

## License

MIT

---

**May your road lead you to warm sands, Dragonborn.**
