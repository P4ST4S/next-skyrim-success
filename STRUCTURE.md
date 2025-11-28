# Project Structure

## File Tree

```
next-skyrim-success/
│
├── .env.example                    # Environment variables template
├── .env.local.example              # Local development env template
├── .gitignore                      # Git ignore rules
├── README.md                       # Project documentation
├── STRUCTURE.md                    # This file - project structure overview
│
├── package.json                    # Dependencies and scripts
├── pnpm-lock.yaml                  # Lock file for pnpm
├── tsconfig.json                   # TypeScript configuration
├── next.config.ts                  # Next.js configuration
├── postcss.config.mjs              # PostCSS configuration
├── eslint.config.mjs               # ESLint configuration
├── drizzle.config.ts               # Drizzle ORM configuration
│
├── public/                         # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
└── src/                            # Source code (all app logic lives here)
    │
    ├── middleware.ts               # Next.js middleware for route protection
    │
    ├── app/                        # Next.js 16 App Router
    │   ├── layout.tsx              # Root layout (applies to all pages)
    │   ├── globals.css             # Global styles + Tailwind v4 config
    │   │
    │   ├── (public)/               # Route Group: Public pages
    │   │   └── page.tsx            # Home page (/) - Achievement list (read-only)
    │   │
    │   └── (admin)/                # Route Group: Admin pages
    │       ├── login/
    │       │   └── page.tsx        # Admin login (/login)
    │       └── dashboard/
    │           └── page.tsx        # Admin dashboard (/admin/dashboard)
    │
    ├── actions/                    # Server Actions (Next.js 16)
    │   ├── auth.ts                 # Authentication actions (login, logout)
    │   └── achievements.ts         # Achievement CRUD actions
    │
    ├── components/                 # React Components
    │   ├── AchievementCard.tsx     # Server Component - displays achievement
    │   └── ui/                     # Reusable UI components
    │       ├── SkyrimCheckbox.tsx  # Client Component - interactive checkbox
    │       └── ProgressBar.tsx     # Server Component - progress visualization
    │
    ├── db/                         # Database layer
    │   ├── index.ts                # Drizzle client initialization
    │   └── schema.ts               # Database schema (achievement_status table)
    │
    ├── lib/                        # Utilities and helpers
    │   ├── auth.ts                 # JWT session management
    │   └── utils.ts                # Utility functions (cn, formatDate, etc.)
    │
    └── data/                       # Static data
        └── achievements.json       # Skyrim achievements catalog (20 items)
```

## Key Directories Explained

### `/src/app` - App Router Structure

Uses **Route Groups** `(public)` and `(admin)` to organize routes without affecting URLs:
- `(public)/page.tsx` → renders at `/`
- `(admin)/login/page.tsx` → renders at `/login`
- `(admin)/dashboard/page.tsx` → renders at `/admin/dashboard`

### `/src/actions` - Server Actions

All server-side mutations live here:
- **auth.ts**: Handles login/logout with JWT
- **achievements.ts**: Toggles achievement completion, fetches status

### `/src/components` - Component Architecture

Follows the **Container/Presenter** pattern:
- **Server Components**: `AchievementCard`, `ProgressBar` (data fetching)
- **Client Components**: `SkyrimCheckbox` (interactivity with `'use client'`)

### `/src/db` - Database Configuration

- **schema.ts**: Defines the `achievement_status` table using Drizzle ORM
- **index.ts**: Exports configured Neon database client

### `/src/lib` - Business Logic

- **auth.ts**: JWT creation, verification, session management
- **utils.ts**: Helper functions (className merger, date formatting, progress calculation)

### `/src/data` - Static Data

- **achievements.json**: 20 immersive Skyrim achievements with metadata (id, title, description, category, icon)

## Architecture Patterns

### 1. Server Components by Default
Every component is a Server Component unless it needs client-side interactivity.

### 2. Client Components at the Leaves
Only `SkyrimCheckbox.tsx` uses `'use client'` because it needs `useState`, `useOptimistic`, and event handlers.

### 3. Optimistic UI
`SkyrimCheckbox` implements instant feedback using React 19's `useOptimistic` hook.

### 4. Server Actions
All data mutations (`toggleAchievement`, `login`) use Server Actions with automatic revalidation.

### 5. Middleware Protection
`middleware.ts` protects `/admin/*` routes and redirects unauthenticated users.

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Routes/Folders | kebab-case | `achievement-list/` |
| Components | PascalCase | `SkyrimCheckbox.tsx` |
| Functions/Variables | camelCase | `calculateProgress` |
| Utilities | kebab-case | `format-date.ts` |
| Route Groups | (parentheses) | `(public)/`, `(admin)/` |

## Design System

### Colors (CSS Variables)
- `--color-skyrim-gold`: Primary accent
- `--color-skyrim-dark`: Background
- `--color-skyrim-parchment`: Text
- `--color-skyrim-brown`: Card backgrounds

### Fonts
- **Cinzel**: Headings (Skyrim-style serif)
- **Inter**: Body text (modern sans-serif)

### Components
- **Parchment Card**: `.parchment-card` class
- **Skyrim Button**: `.btn-skyrim` class
- **Diamond Checkbox**: Custom 45° rotated checkbox

## Tech Stack Summary

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 |
| React | React 19 |
| Styling | Tailwind CSS v4 |
| Database | Neon (PostgreSQL) |
| ORM | Drizzle ORM |
| Auth | JWT (jose) + bcryptjs |
| Icons | Lucide React |
| Language | TypeScript (Strict) |
| Package Manager | pnpm |

---

**Last Updated**: 2024 | Built with ❤️ for Skyrim fans
