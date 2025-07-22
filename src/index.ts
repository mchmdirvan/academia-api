import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { Hono } from "hono";

import { provinceRoute } from "./routes/provinces";
import { rootRoute } from "./routes/roots";

const app = new Hono();

const apiRoutes = app
  .basePath("/")
  .use("*", logger())
  .use("*", cors())
  .route("/", rootRoute)
  .route("/provinces", provinceRoute);

export default app;

export type ApiRoutes = typeof apiRoutes;
