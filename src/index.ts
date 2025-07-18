import { Hono } from "hono";
import { dataSchools } from "./data/schools";

import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

let data = dataSchools;

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Academia API",
  });
});

// GET Schools
app.get("/schools", async (c) => {
  const schools = await prisma.school.findMany({
    include: {
      province: true,
      city: true,
      district: true,
    },
  });

  return c.json(schools);
});

// GET School by ID
app.get("/schools/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const school = await prisma.school.findUnique({
    where: { id },
    include: {
      province: true,
      city: true,
      district: true,
    },
  });
  if (!school) return c.notFound();

  return c.json(school);
});

// POST Create School
app.post("/schools", async (c) => {
  const body = await c.req.json();

  const newSchool = await prisma.school.create({
    data: {
      ...body,
    },
    include: {
      province: true,
      city: true,
      district: true,
    },
  });

  return c.json(newSchool);
});

// DELETE School by ID
app.delete("/schools/:id");

// Delete School
app.delete("/schools");

// PATCH Update School by ID
app.patch("/schools/:id");

// PUT Update School by ID
app.put("/schools/:id");

export default app;
