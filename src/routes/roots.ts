import { Hono } from "hono";

export const rootRoute = new Hono().get("/", (c) => {
  return c.json({
    message: "School API",
    path: {
      schools: "/schools",
      provinces: "/provinces",
      cities: "/cities",
      distirct: "/districts",
    },
  });
});
