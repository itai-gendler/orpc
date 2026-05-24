# Nuxt oRPC Playground

This repository contains the standalone Nuxt playground example for
[oRPC](https://orpc.dev).

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the local Postgres database:

```bash
docker compose up -d
```

Create the database tables and load the playground data:

```bash
pnpm db:push
pnpm db:seed
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.
Open [http://localhost:3000/api](http://localhost:3000/api) to view the Scalar API client.

## Database

The app uses [Drizzle ORM](https://orm.drizzle.team/) with a local Postgres
database. By default it connects to:

```text
postgres://postgres:postgres@localhost:5433/nuxt_orpc_playground
```

Override this with `DATABASE_URL` in `.env`.

Authentication uses [Better Auth](https://better-auth.com/) with email and
password enabled. Better Auth is mounted at `/api/auth/*` and stores users,
sessions, accounts, and verification records in the same Postgres database.
The `/api` reference page serves a single OpenAPI document that includes the
oRPC API plus the supported Better Auth email/password endpoints.
