import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { rootRoute } from "./routes/roots";
import { provinceRoute } from "./routes/provinces";

const app = new Hono();

const apiRoutes = app
  .basePath("/")
  .use("*", logger())
  .use("*", cors())
  .route("/", rootRoute)
  .route("/provinces", provinceRoute);

export default app;

export type ApiRoutes = typeof apiRoutes;
