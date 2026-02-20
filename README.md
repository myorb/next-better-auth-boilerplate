# Next.js Better Auth Boilerplate with Postgres

A production-ready Next.js boilerplate with comprehensive authentication, multi-tenant organization management, and modern UI components. Built with Better Auth, PostgreSQL, and shadcn/ui.

![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black)
![Better Auth](https://img.shields.io/badge/Better%20Auth-1.2.7-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791)

## ✨ Features

### 🔐 Authentication
- **Email & Password** authentication with secure password policies
- **Social Authentication** (Google, GitHub)
- **Email Verification** with customizable templates
- **Two-Factor Authentication** (TOTP & OTP via email)
- **Magic Link** authentication
- **OTP Sign-in** for passwordless authentication
- **Passkeys** support for modern authentication
- **Account Linking** across multiple providers
- **Session Management** with secure cookies

### 🏢 Multi-Tenant Organizations
- **Organization Management** with custom slugs
- **Member Invitations** with email templates
- **Role-based Access Control** (Admin, Member roles)
- **Organization Switching** with session persistence
- **Invitation System** with accept/decline functionality

### 📧 Email System
- **Resend Integration** for reliable email delivery
- **Custom Email Templates** for all auth flows
- **HTML & Plain Text** email rendering
- **Transactional Emails** for verifications and notifications

### 🎨 UI & UX
- **shadcn/ui Components** with Radix UI primitives
- **Dark/Light Theme** support with next-themes
- **Responsive Design** with Tailwind CSS
- **Form Validation** with React Hook Form & Zod
- **Loading States** and error handling
- **Toast Notifications** with Sonner

### 🛠 Developer Experience
- **TypeScript** for type safety
- **Prisma ORM** with PostgreSQL
- **Next-safe-action** for type-safe server actions
- **Database Migrations** with Prisma Migrate
- **ESLint** configuration
- **Environment-based Config** for different stages

### 🔧 Additional Features
- **API Keys Management** with rate limiting
- **Session Analytics** (IP, User Agent tracking)
- **Database Hooks** for custom logic
- **Middleware Protection** for routes
- **Revalidation** for instant UI updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Resend account for emails

### 1. Clone the Repository

```bash
git clone https://github.com/thevinodpatidar/next-better-auth-boilerplate.git
cd next-better-auth-boilerplate
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"

# Email (Resend)
BETTER_AUTH_EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="your-resend-api-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 4. Database Setup

Push the database schema:

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── actions/                 # Server actions for auth & organizations
├── app/                     # Next.js app router pages
│   ├── (app)/              # Protected app routes
│   ├── (auth)/             # Authentication pages
│   └── api/                # API routes
├── components/             # Reusable UI components
│   ├── auth/               # Authentication components
│   ├── sidebar/            # Navigation components
│   └── ui/                 # shadcn/ui components
├── constants/              # App configuration
├── emails/                 # Email templates
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── server/                 # Database schema & connection
├── types/                  # TypeScript type definitions
└── middleware.ts           # Route protection middleware
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Create/apply migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
```

## 🔐 Authentication Flows

### Email & Password
- User registration with email verification
- Secure login with password validation
- Password reset with OTP or email links

### Social Authentication
- Google OAuth integration
- GitHub OAuth integration
- Account linking across providers

### Advanced Security
- Two-factor authentication (TOTP & Email OTP)
- Magic link authentication
- Passkey support for passwordless login
- Session security with secure cookies

## 🏢 Organization Management

### Creating Organizations
```typescript
// Server action for creating organizations
await createOrganizationAction({
  name: "My Company",
  slug: "my-company"
});
```

### Member Management
- Invite members via email
- Role assignment (Admin/Member)
- Accept/decline invitations
- Remove members from organizations

### Organization Settings
- Update organization name and slug
- Manage member roles
- View organization analytics

## 📧 Email Templates

The boilerplate includes email templates for:

- **Email Verification** - Account activation
- **Password Reset** - Secure password recovery
- **Magic Link** - Passwordless authentication
- **2FA OTP** - Two-factor authentication codes
- **Organization Invitations** - Team member invites
- **Email Change Verification** - Secure email updates

## 🗄️ Database Schema

### Core Tables
- `users` - User accounts and profiles
- `sessions` - User sessions with metadata
- `accounts` - OAuth and password accounts
- `organizations` - Multi-tenant organizations
- `members` - Organization membership
- `invitations` - Organization invitations

### Security Tables
- `verifications` - Email/phone verifications
- `two_factors` - 2FA configurations
- `passkeys` - WebAuthn credentials
- `api_keys` - API key management

## 🔒 Security Features

- **CSRF Protection** via Better Auth
- **SQL Injection Prevention** via Prisma ORM
- **XSS Protection** via React's built-in sanitization
- **Secure Cookies** with HttpOnly and SameSite
- **Rate Limiting** for API endpoints
- **Input Validation** with Zod schemas
- **Type Safety** throughout the application

## 🚀 Deployment

### Environment Variables for Production

Ensure all production environment variables are set:

```env
# Production URLs
BETTER_AUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Database (use connection pooling)
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# Email
BETTER_AUTH_EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="your-production-resend-key"

# OAuth (Production apps)
GOOGLE_CLIENT_ID="prod-google-client-id"
GOOGLE_CLIENT_SECRET="prod-google-secret"
GITHUB_CLIENT_ID="prod-github-client-id"
GITHUB_CLIENT_SECRET="prod-github-secret"
```

### Database Migration

For production deployments:

```bash
npm run db:push:prod  # Uses production database config
```

### Recommended Deployment Platforms

- **Vercel** - Seamless Next.js deployment
- **Railway** - Full-stack deployment with PostgreSQL
- **Fly.io** - Global deployment with PostgreSQL
- **AWS/GCP/Azure** - Enterprise deployments

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run the linter: `npm run lint`
5. Commit your changes: `git commit -m 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add JSDoc comments for complex functions
- Update documentation for new features
- Test your changes thoroughly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Better Auth](https://better-auth.com) - Authentication library
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Resend](https://resend.com) - Email delivery
- [Next.js](https://nextjs.org) - React framework

## 📞 Support

If you have questions or need help:

- Open an [issue](https://github.com/your-repo/issues) on GitHub

---

Built with ❤️ using Next.js, Better Auth, and modern web technologies.
