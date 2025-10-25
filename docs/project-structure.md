# Project Structure Guide

This document provides a detailed overview of the Next.js Better Auth Boilerplate project structure, explaining the purpose and organization of each directory and file.

## Root Directory Structure

```
nextjs-better-auth-neon-boilerplate/
├── .env.local                    # Environment variables (development)
├── .env.production.local         # Environment variables (production)
├── .gitignore                    # Git ignore patterns
├── README.md                     # Project documentation
├── package.json                  # Dependencies and scripts
├── next.config.ts               # Next.js configuration
├── next-env.d.ts                # TypeScript declarations
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
├── drizzle.config.ts            # Database configuration
├── drizzle-prod.config.ts       # Production database config
├── components.json              # shadcn/ui configuration
├── middleware.ts                # Route protection middleware
└── docs/                        # Documentation files
```

## Application Structure (`app/`)

The `app/` directory contains Next.js 13+ App Router pages and layouts.

```
app/
├── globals.css                  # Global styles
├── layout.tsx                   # Root layout
├── page.tsx                     # Home page
├── favicon.ico                  # Website favicon
│
├── (app)/                       # Protected application routes
│   ├── layout.tsx              # App layout with sidebar
│   └── organizations/          # Organization pages
│       ├── [slug]/             # Dynamic organization routes
│       │   ├── page.tsx       # Organization dashboard
│       │   ├── layout.tsx     # Organization layout
│       │   ├── members/       # Member management
│       │   │   ├── page.tsx
│       │   │   ├── members-table.tsx
│       │   │   └── components/
│       │   ├── profile/       # User profile pages
│       │   ├── settings/      # Organization settings
│       │   └── components/    # Shared components
│       ├── create/            # Create organization
│       ├── page.tsx           # Organizations list
│       └── organization-*.tsx # Organization components
│
├── (auth)/                      # Authentication routes
│   ├── layout.tsx              # Auth layout
│   ├── signin/                 # Sign in page
│   ├── signup/                 # Sign up page
│   ├── signin-otp/            # OTP sign in
│   ├── verify-otp/            # OTP verification
│   ├── forgot-password/       # Password reset request
│   ├── reset-password/        # Password reset form
│   ├── magic-link/            # Magic link request
│   ├── verify-2fa/            # 2FA verification
│   ├── choose-provider/       # OAuth provider selection
│   └── verify-otp/            # OTP verification
│
├── accept-invitation/          # Invitation acceptance
│   └── [id]/                   # Dynamic invitation routes
│       ├── page.tsx
│       ├── accept-invitation-card.tsx
│       └── invalid-invitation-card.tsx
│
├── onboarding/                 # User onboarding
│   ├── page.tsx
│   └── onboarding-form.tsx
│
└── api/                        # API routes
    └── auth/                   # Better Auth API
        └── [...all]/route.ts   # Catch-all auth routes
```

## Core Directories

### Actions (`actions/`)

Server actions for handling form submissions and API operations.

```
actions/
├── users.ts         # User management actions
├── sessions.ts      # Session management actions
├── accounts.ts      # Account linking actions
├── organizations.ts # Organization CRUD operations
├── sessions.ts      # Session management
└── two-factor.ts    # 2FA operations
```

**Purpose**: Contains type-safe server actions using `next-safe-action`. Each file corresponds to a specific domain (users, organizations, etc.).

### Components (`components/`)

Reusable UI components organized by functionality.

```
components/
├── ui/                          # shadcn/ui components
│   ├── button.tsx              # Button component
│   ├── input.tsx               # Input field
│   ├── card.tsx                # Card container
│   └── ...                     # Other UI primitives
│
├── auth/                        # Authentication components
│   ├── signin-form.tsx         # Sign in form
│   ├── signup-form.tsx         # Sign up form
│   ├── email-otp-form.tsx      # OTP input form
│   ├── magic-link-form.tsx     # Magic link form
│   ├── verify-2fa-form.tsx     # 2FA verification
│   └── google.tsx              # OAuth provider buttons
│
├── sidebar/                     # Navigation components
│   ├── main-layout.tsx         # Main app layout
│   ├── app-sidebar.tsx         # Sidebar navigation
│   ├── nav-main.tsx           # Main navigation items
│   ├── nav-platform.tsx       # Platform navigation
│   ├── nav-settings.tsx       # Settings navigation
│   ├── nav-user.tsx           # User menu
│   └── organization-switcher/  # Organization switching
│       ├── index.tsx
│       ├── organization-dropdown.tsx
│       ├── create-organization.tsx
│       └── switcher-item.tsx
│
├── create-organization-form.tsx # Organization creation
├── providers.tsx               # Context providers
└── ...                         # Other shared components
```

**Purpose**: Modular component architecture with clear separation between UI primitives (shadcn/ui), feature-specific components (auth, sidebar), and shared utilities.

### Configuration (`constants/`)

Application constants and configuration.

```
constants/
└── config.ts    # App configuration (routes, settings)
```

**Purpose**: Centralized configuration for routing, feature flags, and app settings.

### Database (`server/`)

Database schema and connection configuration.

```
server/
├── index.ts     # Database connection
└── schema.ts    # Drizzle ORM schema definitions
```

**Purpose**: Database layer with Drizzle ORM setup, schema definitions, and connection management.

### Authentication (`lib/`)

Core authentication and utility libraries.

```
lib/
├── auth.ts          # Better Auth configuration
├── auth-client.ts   # Client-side auth utilities
├── resend.ts        # Email service configuration
├── safe-action.ts   # Server action configuration
└── utils.ts         # General utility functions
```

**Purpose**: Authentication setup, client utilities, and shared business logic.

### Email Templates (`emails/`)

React Email templates for all email communications.

```
emails/
├── email-verification.tsx      # Account verification
├── reset-password.tsx          # Password reset
├── magic-link-login.tsx        # Magic link authentication
├── 2fa-otp-verification.tsx    # Two-factor codes
├── change-email-verification.tsx # Email change confirmation
├── organization-invitation.tsx # Team invitations
├── signin-otp-verification.tsx # Sign-in OTP
└── reset-password-otp.tsx      # Password reset OTP
```

**Purpose**: Email templates using React Email for consistent, responsive email design.

### Hooks (`hooks/`)

Custom React hooks for shared logic.

```
hooks/
├── use-mobile.ts    # Mobile device detection
└── use-mounted.tsx  # Component mount state
```

**Purpose**: Reusable hooks for common functionality like responsive design helpers.

### Types (`types/`)

TypeScript type definitions.

```
types/
├── user.schema.ts         # User-related types
├── account.schema.ts      # Account types
├── session.schema.ts      # Session types
├── organization.schema.ts # Organization types
├── organizations.ts       # Organization utilities
└── safe-action.types.ts   # Server action types
```

**Purpose**: Type definitions for database schemas, API responses, and server actions.

## Configuration Files

### Database Configuration

#### `drizzle.config.ts`
```typescript
export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

#### `drizzle-prod.config.ts`
Production database configuration with separate credentials.

### Build Configuration

#### `next.config.ts`
Next.js configuration with experimental features and optimizations.

#### `tailwind.config.ts`
Tailwind CSS configuration with custom theme and component setup.

#### `components.json`
shadcn/ui configuration for component generation.

### Development Tools

#### `eslint.config.mjs`
ESLint configuration for code quality and consistency.

#### `tsconfig.json`
TypeScript configuration with path mapping and strict settings.

## File Organization Principles

### 1. Feature-Based Organization
- Related files are grouped by feature (auth, organizations)
- Components are co-located with their routes
- Actions are separated by domain

### 2. Separation of Concerns
- **Components**: UI logic only
- **Actions**: Server operations
- **Lib**: Business logic and utilities
- **Types**: Type definitions

### 3. Scalability Patterns
- **Barrel exports**: Clean imports with index files
- **Shared components**: Common UI in dedicated directories
- **Type safety**: Comprehensive TypeScript coverage

### 4. Configuration Management
- **Environment variables**: External configuration
- **Constants**: Internal app configuration
- **Schemas**: Data validation rules

## Development Workflow

### Adding New Features

1. **Database Schema** → Update `server/schema.ts`
2. **Types** → Add types in `types/`
3. **Actions** → Create server actions in `actions/`
4. **Components** → Build UI in `components/`
5. **Routes** → Add pages in `app/`
6. **Configuration** → Update constants if needed

### File Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: kebab-case (e.g., `user-profile.ts`)
- **Directories**: kebab-case (e.g., `user-profile/`)
- **Types**: PascalCase with suffix (e.g., `UserProfile`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `DEFAULT_ROLE`)

### Import Patterns

```typescript
// Barrel exports
export { Button } from "./ui/button";
export { Input } from "./ui/input";

// Relative imports for co-located files
import { UserProfile } from "./user-profile";

// Absolute imports for shared utilities
import { auth } from "@/lib/auth";
import { db } from "@/server";
```

## Performance Considerations

### Code Splitting
- Route-based code splitting (automatic with App Router)
- Component lazy loading for heavy components
- Dynamic imports for optional features

### Bundle Optimization
- Tree shaking with unused export elimination
- Image optimization with Next.js Image component
- Font optimization with next/font

### Database Optimization
- Connection pooling in production
- Query optimization with proper indexing
- Caching strategies for frequently accessed data

This project structure provides a solid foundation for scalable, maintainable Next.js applications with clear separation of concerns and modern development practices.
