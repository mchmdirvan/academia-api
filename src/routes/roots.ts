import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { configApp, configDocs } from "../config/app";

const tags = ["root"];

export const rootRoute = new OpenAPIHono();
