# TicketFlow API

A REST API for managing customer support tickets, built with Node.js, Express, Sequelize and PostgreSQL. No frontend — just a backend with tests and a CI pipeline.

Built as a 5-day training project (backend dev internship, NovaDev Solutions).

## What it does

Lets a support team create, categorize, prioritize and track tickets through their status: `open`, `in_progress`, `resolved`, `closed`. Status changes follow fixed rules — you can't skip straight from `open` to `closed`, for example.

## Stack

- Node.js + Express
- PostgreSQL (running in Docker)
- Sequelize (ORM)
- Zod (input validation)
- Jest (unit tests)
- GitHub Actions (CI: lint + tests on every push)

## Structure

```
Router → Controller → Service → Repository → PostgreSQL
```

- **Controller** — handles the request/response
- **Service** — business logic, including the status rules
- **Repository** — the only place that talks to the database

## Status rules

- New tickets start as `open`
- Allowed path: `open → in_progress → resolved → closed`
- A `closed` ticket can only be reopened, going back to `open`
- You can't jump straight from `open` to `closed`
- Priority is one of `low`, `medium`, `high`

## Setup

1. Clone and install
   ```bash
   git clone https://github.com/lightium-dev/ticketflow_api.git
   cd ticketflow_api
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your DB credentials
   ```bash
   cp .env.example .env
   ```

3. Start a Postgres container
   ```bash
   docker run --name ticketflow-postgres \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=yourpassword \
     -e POSTGRES_DB=ticketflow \
     -p 5434:5432 \
     -d postgres:16
   ```
   Match the port/password in `.env`.

4. Create the tables
   ```bash
   node src/sync-db.js
   ```

5. Run it
   ```bash
   npm start
   ```

API runs on `http://localhost:3000`.

## Env variables

| Variable | What it's for |
|---|---|
| `PORT` | server port |
| `PGHOST` | Postgres host |
| `PGPORT` | Postgres port |
| `PGUSER` | Postgres user |
| `PGPASSWORD` | Postgres password |
| `PGDATABASE` | database name |

## Commands

- `npm start` — run the server
- `npm run dev` — run with auto-reload
- `npm run lint` — check code style
- `npm test` — run tests with coverage

## Endpoints

**Categories**
- `GET /categories` / `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `DELETE /categories/:id`

**Tickets**
- `GET /tickets` / `GET /tickets/:id`
- `POST /tickets`
- `PUT /tickets/:id`
- `PATCH /tickets/:id/status` — change status (rules enforced here)
- `DELETE /tickets/:id`

## Tests

Repository layer is mocked, so tests hit the service logic only, not a real database.

```bash
npm test
```

100% statement coverage on both services.

## CI

Every push/PR to `main` runs lint + tests automatically. See `.github/workflows/ci.yml`.
