# Contributing to Next.js Better Auth Boilerplate

Thank you for your interest in contributing to the Next.js Better Auth Boilerplate! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Contributing Guidelines](#contributing-guidelines)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)
- [Documentation](#documentation)

## Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm/yarn/pnpm**: Latest stable version
- **Git**: Latest stable version
- **PostgreSQL**: Local or cloud instance (Neon recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/your-username/nextjs-better-auth-boilerplate.git
cd nextjs-better-auth-boilerplate
```

3. Add the upstream remote:
```bash
git remote add upstream https://github.com/original-owner/nextjs-better-auth-boilerplate.git
```

## Development Setup

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp docs/environment-variables.md .env.example
# Edit .env.local with your configuration
```

Required environment variables for development:
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_URL`: `http://localhost:3000`
- `BETTER_AUTH_SECRET`: Secure random string
- `BETTER_AUTH_EMAIL_FROM`: Your email for testing
- `RESEND_API_KEY`: Resend API key (optional for email testing)

### 3. Database Setup

```bash
# Generate database schema
npm run db:generate

# Push schema to database
npm run db:push

# (Optional) Open Drizzle Studio
npm run db:studio
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

Understanding the project structure is crucial for effective contributions:

```
├── actions/          # Server actions
├── app/             # Next.js app router pages
├── components/      # Reusable UI components
├── constants/       # App configuration
├── docs/           # Documentation
├── emails/         # Email templates
├── hooks/          # Custom React hooks
├── lib/            # Core utilities
├── server/         # Database schema
├── types/          # TypeScript definitions
└── middleware.ts   # Route protection
```

See [docs/project-structure.md](docs/project-structure.md) for detailed information.

## Contributing Guidelines

### Code Style

#### TypeScript
- Use TypeScript for all new code
- Enable strict mode settings
- Use descriptive type names
- Avoid `any` type when possible

#### React Components
```tsx
// ✅ Good
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

export function UserProfile({ user, onUpdate }: UserProfileProps) {
  // Component logic
}

// ❌ Avoid
export function UserProfile(props) {
  // Component logic
}
```

#### File Organization
- Group related components in folders
- Use barrel exports (`index.ts`) for clean imports
- Separate concerns (UI, business logic, types)

### Commit Messages

Follow conventional commit format:

```bash
# ✅ Good
feat: add social authentication with Google
fix: resolve email verification redirect issue
docs: update API reference for organization endpoints
refactor: simplify user profile component structure

# ❌ Avoid
update code
fix bug
add stuff
```

### Testing

- Write tests for new features
- Test authentication flows thoroughly
- Verify database operations
- Test email templates rendering

### Performance
- Optimize database queries
- Use proper React patterns (memo, useCallback)
- Minimize bundle size impact
- Consider accessibility (a11y)

## Submitting Changes

### 1. Create a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Follow the established patterns
- Add tests for new functionality
- Update documentation as needed
- Ensure code passes linting

### 3. Test Your Changes

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Test database operations
npm run db:push

# Manual testing of features
```

### 4. Commit Changes

```bash
# Stage your changes
git add .

# Commit with conventional format
git commit -m "feat: add your feature description"

# Or use interactive rebase for multiple commits
git rebase -i main
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
# - Use descriptive title
# - Provide detailed description
# - Reference related issues
# - Add screenshots for UI changes
```

## Types of Contributions

### 🐛 Bug Fixes
- Fix security vulnerabilities
- Resolve UI/UX issues
- Fix authentication flows
- Database operation fixes

### ✨ Features
- New authentication methods
- Additional organization features
- UI/UX improvements
- API enhancements

### 📚 Documentation
- Update existing docs
- Add new guides
- Improve code comments
- Create video tutorials

### 🧪 Testing
- Add unit tests
- Integration tests
- E2E test scenarios
- Performance testing

### 🔧 Maintenance
- Dependency updates
- Code refactoring
- Performance optimizations
- Security improvements

## Pull Request Process

### PR Template
Use the provided PR template with:

- **Description**: What changes and why
- **Type of Change**: Bug fix, feature, documentation, etc.
- **Breaking Changes**: Any breaking changes
- **Testing**: How to test the changes
- **Screenshots**: For UI changes

### Review Process
1. **Automated Checks**: CI/CD runs tests and linting
2. **Code Review**: Maintainers review code quality
3. **Testing**: Verify functionality works as expected
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash merge with conventional commit message

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Tests added/updated for new functionality
- [ ] Documentation updated for changes
- [ ] Breaking changes documented
- [ ] Commit messages follow conventional format
- [ ] PR description is clear and comprehensive

## Reporting Issues

### Bug Reports

Use the bug report template with:

**Expected Behavior**
Describe what should happen

**Actual Behavior**
Describe what actually happens

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Environment**
- OS: [e.g., macOS, Windows]
- Browser: [e.g., Chrome 91]
- Node.js version: [e.g., 18.0.0]

### Feature Requests

Use the feature request template with:

**Problem**
Describe the problem you're trying to solve

**Solution**
Describe the solution you'd like

**Alternatives**
Describe alternative solutions you've considered

**Additional Context**
Add any other context about the feature request

## Documentation

### Updating Documentation

1. **README.md**: Main project documentation
2. **docs/**: Detailed guides and API reference
3. **Code Comments**: Inline documentation for complex logic
4. **TypeScript**: Self-documenting with types

### Documentation Standards

- Use Markdown for all documentation
- Include code examples where helpful
- Keep screenshots up to date
- Use consistent formatting
- Test all code examples

## Community

### Getting Help

- **GitHub Discussions**: General questions and discussions
- **GitHub Issues**: Bug reports and feature requests
- **Stack Overflow**: Technical questions with `nextjs-better-auth` tag

### Recognition

Contributors are recognized through:
- GitHub contributor statistics
- Mention in release notes
- Community showcase
- Contributor badges

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Questions?

If you have questions about contributing:

1. Check existing issues and documentation
2. Search GitHub Discussions
3. Open a new discussion if needed

Thank you for contributing to the Next.js Better Auth Boilerplate! 🚀
