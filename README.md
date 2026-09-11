# Ferrari — Full-Stack E-Commerce Platform

A scalable, full-stack e-commerce application built with **Next.js**, **TypeScript**, and **Turborepo**. The project uses a monorepo architecture to separate the customer storefront, administration dashboard, shared UI components, and platform configuration.

> Built as a microservices-oriented shopping application tutorial project, focused on maintainable boundaries, reusable packages, and independently deployable frontend applications.

## Live Demo

- **Storefront:** [ferrari-client.vercel.app](https://ferrari-client.vercel.app/)
- **Repository:** [github.com/rishavvrajj/ferrari](https://github.com/rishavvrajj/ferrari)

## Architecture

```text
                         ┌─────────────────────┐
                         │     Turborepo       │
                         │  npm Workspaces     │
                         └──────────┬──────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
 ┌────────▼────────┐       ┌────────▼────────┐      ┌────────▼────────┐
 │ Customer Client │       │ Admin Dashboard │      │ Documentation   │
 │   apps/client   │       │   apps/admin    │      │   apps/docs     │
 └────────┬────────┘       └────────┬────────┘      └─────────────────┘
          │                         │
          └─────────────┬───────────┘
                        │
             ┌──────────▼───────────┐
             │ Shared Workspace     │
             │ packages/ui          │
             │ eslint-config        │
             │ typescript-config    │
             └──────────────────────┘
```

## Features

### Customer Storefront

- Product browsing and catalog-style shopping interface
- Responsive product-focused user experience
- Reusable UI components shared across applications
- Next.js-based frontend architecture
- Type-safe development with TypeScript

### Admin Dashboard

- Separate administrative application
- Foundation for product, category, inventory, and order management
- Isolated admin UI and deployment boundary
- Shared code-quality and TypeScript configuration

### Developer Experience

- Turborepo task orchestration and build caching
- npm workspaces for managing apps and shared packages
- Shared React component library
- Centralized ESLint and TypeScript configurations
- Prettier-based formatting workflow
- Independent app builds using Turbo filters

## Tech Stack

| Category | Technologies |
| --- | --- |
| Frontend | Next.js, React, TypeScript |
| Monorepo | Turborepo, npm Workspaces |
| Shared Code | React component package (`@repo/ui`) |
| Code Quality | ESLint, Prettier |
| Type Safety | TypeScript, shared `tsconfig` package |
| Deployment | Vercel |
| Runtime | Node.js 24+ |

## Repository Structure

```text
ferrari/
├── apps/
│   ├── admin/                  # Admin dashboard application
│   ├── client/                 # Customer-facing storefront
│   ├── docs/                   # Project documentation app
│   └── web/                    # Additional Next.js application
│
├── packages/
│   ├── eslint-config/          # Shared ESLint configuration
│   ├── typescript-config/      # Shared TypeScript configuration
│   └── ui/                     # Shared React UI component library
│
├── package.json                # Root workspace scripts and dependencies
├── turbo.json                  # Turbo task pipeline configuration
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js `>= 24`
- npm `>= 12`

Verify your local environment:

```bash
node --version
npm --version
```

### Installation

```bash
git clone [https://github.com/rishavvrajj/ferrari.git](https://github.com/rishavvrajj/ferrari.git)
cd ferrari
npm install
```

## Development

Start all workspace applications in development mode:

```bash
npm run dev
```

Run a single application with Turbo filtering:

```bash
npx turbo dev --filter=client
```

Examples:

```bash
npx turbo dev --filter=admin
npx turbo dev --filter=client
npx turbo dev --filter=docs
npx turbo dev --filter=web
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the `dev` task across workspace applications |
| `npm run build` | Builds all apps and packages using Turbo |
| `npm run lint` | Runs ESLint checks across the monorepo |
| `npm run check-types` | Runs TypeScript validation across the monorepo |
| `npm run format` | Formats `.ts`, `.tsx`, and `.md` files with Prettier |

## Production Build

Build every application and shared package:

```bash
npm run build
```

Build only the customer-facing storefront:

```bash
npx turbo build --filter=client
```

Build only the admin dashboard:

```bash
npx turbo build --filter=admin
```

## Quality Checks

Run these commands before opening a pull request:

```bash
npm run lint
npm run check-types
npm run build
```

Format the codebase:

```bash
npm run format
```

## Turbo Pipeline

The root `turbo.json` configures the project task graph:

- `build` runs dependency builds first through `dependsOn: ["^build"]`
- Build outputs include `.next/**` while excluding development and cache artifacts
- `lint` and `check-types` run across dependent packages first
- `dev` is persistent and intentionally excluded from Turbo caching

This ensures shared packages are built and validated before applications that depend on them.

## Microservices Direction

This repository is structured to support a microservices-oriented e-commerce system. The current monorepo boundaries make it straightforward to evolve the platform into independently deployable services.

```text
Future service boundaries:

services/
├── auth-service/          # Authentication and authorization
├── catalog-service/       # Products, categories, pricing
├── inventory-service/     # Stock management
├── order-service/         # Cart, checkout, orders
├── payment-service/       # Payment-provider integration
├── notification-service/  # Email and order notifications
└── api-gateway/           # Central API routing and aggregation
```

Potential production integrations:

- PostgreSQL or MongoDB for persistent data
- Prisma or Drizzle ORM for database access
- Redis for caching, sessions, and rate limiting
- Stripe or Razorpay for payments
- Kafka or RabbitMQ for asynchronous events
- Docker for containerized services
- GitHub Actions for CI/CD
- Vercel for frontend deployment

## Contribution Workflow

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/feature-name
   ```

3. Implement your changes.
4. Run linting, type checks, and builds.
5. Commit using a clear conventional-style message:

   ```bash
   git commit -m "feat: add product management view"
   ```

6. Push the branch and open a pull request.

## Roadmap

- [ ] Product catalog and category management
- [ ] Authentication and role-based access control
- [ ] Shopping cart and checkout flow
- [ ] Order management dashboard
- [ ] Inventory tracking
- [ ] Payment gateway integration
- [ ] Database persistence
- [ ] API gateway and service boundaries
- [ ] Docker-based local development
- [ ] CI/CD pipeline
- [ ] Unit, integration, and end-to-end tests

## License

This repository does not currently include a license. Add a `LICENSE` file before distributing or permitting reuse of the project.

---

Built with Next.js, TypeScript, npm Workspaces, and Turborepo.