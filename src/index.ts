import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Hono } from "hono";

import { provinceRoute } from "./routes/provinces";
import { rootRoute } from "./routes/roots";
import { citiesRoute } from "./routes/district";

const app = new Hono();

const apiRoutes = app
  .basePath("/")
  .use("*", logger())
  .use("*", cors())
  .route("/", rootRoute)
  .route("/provinces", provinceRoute)
  .route("/cities", citiesRoute);

export default app;

export type ApiRoutes = typeof apiRoutes;
