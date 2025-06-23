import { Hono } from "hono";

import { schools } from "./data/schools";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Schools API",
  });
});

// GET Schools
app.get("/schools", (c) => {
  return c.json(schools);
});

// GET School by ID
app.get("/schools/:id", (c) => {
  const id = Number(c.req.param("id"));

  const school = schools.find((school) => school.id === id);
  if (!school) return c.notFound();

  return c.json(school);
});

// POST Create School

// Delete School

// DELETE School by ID

// PATCH Update School by ID

// PUT Update School by ID

export default app;
