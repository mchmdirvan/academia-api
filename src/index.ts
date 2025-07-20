import { Hono } from "hono";
import { prisma } from "./utils/db";

import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    message: "School API",
    schools: "/schools",
  });
});

app.get("/provinces", async (c) => {
  const provinces = await prisma.province.findMany();
  console.log(provinces);
  return c.json(provinces);
});

export default app;
