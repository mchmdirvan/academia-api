import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import slugify from "slugify";

import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";
import { prisma } from "../utils/db";

const tags = ["provinces"];

export const provinceRoute = new OpenAPIHono();

provinceRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags,
    description: "Get all Provines",
    responses: {
      200: {
        description: "Hello",
      },
    },
  }),
  async (c) => {
    const province = await prisma.province.findMany();

    return c.json(province);
  }
);
