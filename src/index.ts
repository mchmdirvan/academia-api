import { Hono } from "hono";

import { schools } from "./data/schools";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Schools API",
  });
});

app.get("/schools", (c) => {
  return c.json(schools);
});

app.get("/schools/:id", (c) => {
  const id = Number(c.req.param("id"));

  const school = schools.find((school) => school.id === id);
  if (!school) return c.notFound();

  return c.json(school);
});

export default app;
