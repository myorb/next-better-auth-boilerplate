# Environment Variables Guide

This guide explains all environment variables used in the Next.js Better Auth Boilerplate.

## Required Variables

### Database Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) | `postgresql://username:password@host:port/database` |

### Better Auth Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `BETTER_AUTH_URL` | Base URL for Better Auth (must match your domain) | ✅ | `http://localhost:3000` |
| `BETTER_AUTH_SECRET` | Secret key for JWT signing | ✅ | `your-super-secure-secret-key-here` |

### Email Configuration

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `BETTER_AUTH_EMAIL_FROM` | Email address for sending emails | ✅ | `noreply@yourdomain.com` |
| `RESEND_API_KEY` | Resend API key for email delivery | ✅ | `re_your-resend-api-key-here` |

## Optional Variables

### OAuth Providers

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ | `your-google-client-id` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ❌ | `your-google-client-secret` |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID | ❌ | `your-github-client-id` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret | ❌ | `your-github-client-secret` |

### Production Configuration

| Variable | Description | Environment | Example |
|----------|-------------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Production app URL for client-side redirects | Production | `https://yourdomain.com` |

## Setting Up Environment Variables

### Development

1. Copy the example environment file:
```bash
cp .env.local .env.local.backup  # Backup existing config
```

2. Configure your variables in `.env.local`:
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# Better Auth
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"

# Email (Resend)
BETTER_AUTH_EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="your-resend-api-key"

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Production

For production deployments, ensure you have:

```env
# Production URLs
BETTER_AUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# Production database (with SSL)
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"

# Production email configuration
BETTER_AUTH_EMAIL_FROM="noreply@yourdomain.com"
RESEND_API_KEY="your-production-resend-key"

# Production OAuth credentials
GOOGLE_CLIENT_ID="prod-google-client-id"
GOOGLE_CLIENT_SECRET="prod-google-secret"
GITHUB_CLIENT_ID="prod-github-client-id"
GITHUB_CLIENT_SECRET="prod-github-secret"
```

## Security Best Practices

### Secret Generation

Generate secure secrets for production:

```bash
# Generate a secure random string for BETTER_AUTH_SECRET
openssl rand -base64 32
```

### OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`

#### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL:
   - Development: `http://localhost:3000/api/auth/callback/github`
   - Production: `https://yourdomain.com/api/auth/callback/github`

### Email Configuration

#### Resend Setup
1. Sign up at [Resend](https://resend.com)
2. Verify your domain
3. Get your API key from the dashboard
4. Add your sending email to verified domains

## Environment-Specific Configuration

The application supports different configurations for development and production:

- **Development**: Uses `.env.local`
- **Production**: Uses environment variables set in your deployment platform

### Deployment Platform Examples

#### Vercel
Set environment variables in your Vercel project settings or use the CLI:

```bash
vercel env add BETTER_AUTH_SECRET
vercel env add DATABASE_URL
vercel env add RESEND_API_KEY
```

#### Railway
Environment variables are set in the Railway dashboard under your service variables.

#### Docker
Create a `.env` file in your Docker context or pass variables via `-e` flags:

```dockerfile
ENV BETTER_AUTH_URL=https://yourdomain.com
ENV DATABASE_URL=postgresql://user:pass@db:5432/app
```

## Troubleshooting

### Common Issues

1. **"BETTER_AUTH_URL mismatch"**
   - Ensure `BETTER_AUTH_URL` matches your actual domain
   - Include protocol (http/https)

2. **Database connection failed**
   - Check `DATABASE_URL` format
   - Ensure database is accessible
   - For Neon: Verify connection string includes pooling if needed

3. **Email not sending**
   - Verify `RESEND_API_KEY` is correct
   - Check that `BETTER_AUTH_EMAIL_FROM` is verified in Resend
   - Ensure domain is verified for sending

4. **OAuth redirect errors**
   - Verify callback URLs in OAuth provider settings
   - Ensure redirect URIs match your domain

### Environment Variable Validation

The application will throw descriptive errors if required environment variables are missing. Check your console logs for specific error messages during startup.
