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

  return c.json(provinces);
});

app.get("/provinces/:slug", async (c) => {
  const slug = c.req.param("slug");

  const province = await prisma.province.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!province) {
    c.notFound();
  }

  return c.json(province);
});

export default app;
