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
app.delete("/schools", (c) => {
  const id = Number(c.req.param("id"));

  schools = [];

  return c.json(schools);
});

// PATCH Update School by ID
app.patch("/schools/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const newSchool = {
    id: Number(id),
    ...body,
  };

  const updatedSchool = schools.map((school) => {
    if (school.id == id) {
      return {
        ...school,
        ...newSchool,
      };
    } else {
      return school;
    }
  });

  schools = updatedSchool;
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

  const updatedSchool = schools.map((school) => {
    if (school.id == id) {
      return {
        ...school,
        ...newSchool,
      };
    } else {
      return school;
    }
  });

  schools = updatedSchool;
  return c.json(newSchool);
});

export default app;
