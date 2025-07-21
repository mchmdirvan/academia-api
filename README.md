# Academia API

A simple REST API for managing schools

## REST API Specification

- Production URL: [https://academia-api.onrender.com](https://academia-api.onrender.com)
- Local URL: [http://localhost:3000](http://localhost:3000)

School:

| Endpoint       | HTTP   | Description                     | Done |
| -------------- | ------ | ------------------------------- | ---- |
| `/schools`     | GET    | List all schools                |      |
| `/schools/:id` | GET    | Get a school by ID              |      |
| `/schools`     | POST   | Create a new school             |      |
| `/schools`     | DELETE | Delete All Schools              |      |
| `/schools/:id` | DELETE | Delete a school by ID           |      |
| `/schools/:id` | PUT    | Update a school by ID           |      |
| `/schools/:id` | PATCH  | Partially update a school by ID |      |

Provinces:

| Endpoint         | HTTP   | Description                       | Done |
| ---------------- | ------ | --------------------------------- | ---- |
| `/provinces`     | GET    | List all provinces                | ✅   |
| `/provinces/:id` | GET    | Get a province by ID              |      |
| `/provinces`     | POST   | Create a new province             |      |
| `/provinces`     | DELETE | Delete All Provinces              |      |
| `/provinces/:id` | DELETE | Delete a province by ID           |      |
| `/provinces/:id` | PUT    | Update a province by ID           |      |
| `/provinces/:id` | PATCH  | Partially update a province by ID |      |

## ERD Diagram

![ERD Diagram](/public/erd.png)
[ERD Diagram](https://dbdiagram.io/d/Academia-API-6867c5fdf413ba35084f6b3d)

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
