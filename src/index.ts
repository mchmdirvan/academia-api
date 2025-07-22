import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import { Scalar } from "@scalar/hono-api-reference";
import { configDocs, configApp } from "./config/app";

import { rootRoute } from "./routes/roots";
import { provinceRoute } from "./routes/provinces";

const app = new OpenAPIHono();

app.use("*", logger()).use("*", cors());

const apiRoutes = app
  .basePath("/")
  .route("/", rootRoute)
  .route("/provinces", provinceRoute);

apiRoutes
  .get(configDocs.swagger, swaggerUI({ url: "/openapi.json" }))
  .get(configDocs.docs, Scalar({ spec: { url: "/openapi.json" } }))
  .get("/swagger", swaggerUI({ url: "/openapi.json" }))
  .get("/scalar", Scalar({ spec: { url: "/openapi.json" } }))
  .onError((err, c) => {
    return c.json({ code: 500, status: "error", message: err.message }, 500);
  });

export default app;

export type ApiRoutes = typeof apiRoutes;
