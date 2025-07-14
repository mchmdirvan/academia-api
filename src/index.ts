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
  const schools = await prisma.school.findMany();
  return c.json(schools);
});

// GET School by ID
app.get("/schools/:id", async (c) => {
  const id = Number(c.req.param("id"));

  const school = await prisma.school.findUnique({
    where: { id },
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
  });

  return c.json(newSchool);
});

// DELETE School by ID
app.delete("/schools/:id", (c) => {
  const id = Number(c.req.param("id"));

  const filteredSchool = data.filter((school) => {
    return school.id != id;
  });

  data = filteredSchool;

  return c.json(filteredSchool);
});

// Delete School
app.delete("/schools", (c) => {
  const id = Number(c.req.param("id"));

  data = [];

  return c.json(data);
});

// PATCH Update School by ID
app.patch("/schools/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const newSchool = {
    id: Number(id),
    ...body,
  };

  const updatedSchool = data.map((school) => {
    if (school.id == id) {
      return {
        ...school,
        ...newSchool,
      };
    } else {
      return school;
    }
  });

  data = updatedSchool;
  return c.json(newSchool);
});

// PUT Update School by ID
app.put("/schools/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const newSchool = {
    id: Number(id),
    ...body,
  };

  // Find school by id
  // IF (!school) create
  // ELSE update
  const school = data.find((school) => school.id == id);
  if (!school) {
    const nextId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    const newSchool = {
      id: nextId,
      ...body,
    };
    const updatedSchools = [...data, newSchool];
    data = updatedSchools;
  } else {
    const updatedSchool = data.map((school) => {
      if (school.id == id) {
        return {
          ...school,
          ...newSchool,
        };
      } else {
        return school;
      }
    });
    data = updatedSchool;
    return c.json(newSchool);
  }
});

export default app;
