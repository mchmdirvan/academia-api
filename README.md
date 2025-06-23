# Academia API

A simple REST API for managing schools

## REST API Specification

| Endpoint       | HTTP   | Description                     | Done |
| -------------- | ------ | ------------------------------- | ---- |
| `/schools`     | GET    | List all schools                | ✅   |
| `/schools/:id` | GET    | Get a school by ID              | ✅   |
| `/schools`     | POST   | Create a new school             | ✅   |
| `/schools`     | DELETE | Delete All Schools              |      |
| `/schools/:id` | DELETE | Delete a school by ID           | ✅   |
| `/schools/:id` | PUT    | Update a school by ID           |      |
| `/schools/:id` | PATCH  | Partially update a school by ID |      |

## Getting Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
