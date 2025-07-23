import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Hono } from "hono";

import { provinceRoute } from "./routes/provinces";
import { districtRoute } from "./routes/district";
import { citiesRoute } from "./routes/cities";
import { rootRoute } from "./routes/roots";
import { schoolRoute } from "./routes/schools";

const app = new Hono();

const apiRoutes = app
  .basePath("/")
  .use("*", logger())
  .use("*", cors())
  .route("/", rootRoute)
  .route("/provinces", provinceRoute)
  .route("/cities", citiesRoute)
  .route("/districts", districtRoute)
  .route("/schools", schoolRoute);

export default app;

export type ApiRoutes = typeof apiRoutes;
