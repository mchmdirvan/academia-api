import { Hono } from "hono";
import { dataSchools } from "./data/schools";

let schools = dataSchools;

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    message: "Academia API",
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
app.post("/schools", async (c) => {
  const body = await c.req.json();

  const nextId = schools.length > 0 ? schools[schools.length - 1].id + 1 : 1;

  const newSchool = {
    id: nextId,
    ...body,
  };

  const updatedSchools = [...schools, newSchool];

  schools = updatedSchools;

  return c.json(newSchool);
});

// DELETE School by ID
app.delete("/schools/:id", (c) => {
  const id = Number(c.req.param("id"));

  const filteredSchool = schools.filter((school) => {
    return school.id != id;
  });

  schools = filteredSchool;

  return c.json(filteredSchool);
});

// Delete School

// PATCH Update School by ID

// PUT Update School by ID

export default app;
