import { Hono } from "hono";

import { schools } from "./data/schools";

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
app.post("/schools", (c) => {
  // request body
  const newSchool = {
    id: schools[schools.length - 1].id + 1,
    name: "SMAN 93 JAKARTA",
    npsn: "20103258",
    address: "JL. RAYA BOGOR KOMP. PASWALPRES",
    provinceId: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrictId: "016405  ",
    subdistrict: "Kec. Kramat Jati",
  };

  const updatedSchools = [...schools, newSchool];

  return c.json(updatedSchools);
});

// Delete School

// DELETE School by ID
app.delete("/schools/:id", (c) => {
  const id = Number(c.req.param("id"));

  const filteredSchool = schools.filter((school) => {
    return school.id != id;
  });

  return c.json(filteredSchool);
});

// PATCH Update School by ID

// PUT Update School by ID

export default app;
