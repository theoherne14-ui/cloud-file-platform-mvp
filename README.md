# Cloud File Platform MVP

This monorepo contains:
- NestJS API backend
- React + Vite frontend
- Prisma schema for PostgreSQL
- user, role, workspace and provider foundation

## Structure

- `apps/api` – NestJS API
- `apps/web` – React frontend

## Quick start

1. Install dependencies:
   - `npm install`
2. Copy environment variables:
   - `cp apps/api/.env.example apps/api/.env`
3. Start PostgreSQL
4. Run Prisma:
   - `npm run prisma:generate`
   - `npm run prisma:migrate`
5. Start development servers:
   - `npm run dev:api`
   - `npm run dev:web`

## Notes

This is a production-minded MVP starter for a cloud file platform that supports:
- OAuth providers like Google and Microsoft
- API key / FTP style services
- Role-based access
- file provider abstractions
- workspace management

