# supplyChainPOC1

## Docker setup

This repo now includes a Docker Compose stack for:

- `ui`: React frontend served by Nginx
- `api`: Express API
- `postgres`: PostgreSQL 16

### Start the stack

```bash
docker compose up --build
```

### Run in background

```bash
docker compose up --build -d
```

### Stop the stack

```bash
docker compose down
```

### Service URLs

- UI: `http://localhost:8080`
- API: `http://localhost:3000/api`
- Postgres: `localhost:5432`

### Postgres defaults

- Database: `turrant`
- User: `turrant`
- Password: `turrantdev`

### Notes

- The UI container uses SPA routing support through Nginx.
- Nginx proxies `/api` requests from the UI container to the API container.
- `DATABASE_URL` is already wired into the API container environment, but the current API code does not yet persist data to Postgres. This setup prepares the infrastructure for that migration.
