import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("School API");
});

export default app;
