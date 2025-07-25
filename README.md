# Academia API

A simple REST API for managing schools

## REST API Specification

- Production URL: [https://academia-api-htjl.onrender.com/](https://academia-api-htjl.onrender.com/)
- Local URL: [http://localhost:3000](http://localhost:3000)

School:

| Endpoint       | HTTP   | Description                     | Done |
| -------------- | ------ | ------------------------------- | ---- |
| `/schools`     | GET    | List all schools                | ✅   |
| `/schools/:id` | GET    | Get a school by ID              | ✅   |
| `/schools`     | POST   | Create a new school             | ✅   |
| `/schools`     | DELETE | Delete All Schools              |      |
| `/schools/:id` | DELETE | Delete a school by ID           |      |
| `/schools/:id` | PUT    | Update a school by ID           |      |
| `/schools/:id` | PATCH  | Partially update a school by ID |      |

Provinces:

| Endpoint         | HTTP   | Description                       | Done |
| ---------------- | ------ | --------------------------------- | ---- |
| `/provinces`     | GET    | List all provinces                | ✅   |
| `/provinces/:id` | GET    | Get a province by ID              | ✅   |
| `/provinces`     | POST   | Create a new province             | ✅   |
| `/provinces/:id` | DELETE | Delete a province by ID           | ✅   |
| `/provinces/:id` | PUT    | Update a province by ID           | ✅   |
| `/provinces/:id` | PATCH  | Partially update a province by ID |      |

Cities:

| Endpoint      | HTTP   | Description                   | Done |
| ------------- | ------ | ----------------------------- | ---- |
| `/cities`     | GET    | List all cities               | ✅   |
| `/cities/:id` | GET    | Get a city by ID              | ✅   |
| `/cities`     | POST   | Create a new city             | ✅   |
| `/cities/:id` | DELETE | Delete a city by ID           |      |
| `/cities/:id` | PUT    | Update a city by ID           |      |
| `/cities/:id` | PATCH  | Partially update a city by ID |      |

Districts:

| Endpoint         | HTTP   | Description                       | Done |
| ---------------- | ------ | --------------------------------- | ---- |
| `/districts`     | GET    | List all districts                | ✅   |
| `/districts/:id` | GET    | Get a district by ID              | ✅   |
| `/districts`     | POST   | Create a new district             | ✅   |
| `/districts/:id` | DELETE | Delete a district by ID           |      |
| `/districts/:id` | PUT    | Update a district by ID           |      |
| `/districts/:id` | PATCH  | Partially update a district by ID |      |

## ERD Diagram

![ERD Diagram](/public/erd.png)

## Getting Started

Copy and edit `.env` file:

```sh
cp .env.example .env
```

Setup database:

```sh
# Run database only
docker:up
```

Install dependencies:

```sh
bun install
```

Migrate database and generate Prisma Client:

```sh
bun db:migrate
# prisma migrate dev && prisma generate
```

Seed initial products:

```sh
bun db:seed
# prisma db seed
```

Run development server:

```sh
bun dev
# bun run --hot src/index.ts
```

Open <http://localhost:3000>.

## Production

Make sure the `DATABASE_URL` is configured in `.env` file for usage with Docker Compose.

Build the Docker image:

```sh
bun docker:build
# docker compose up -d --build
```

If only run the Docker container:

```sh
bun docker:up
# docker compose up -d
```

Open <http://localhost:3000>.
