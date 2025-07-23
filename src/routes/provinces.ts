import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";
import { Hono } from "hono";
import z from "zod";

import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

import { prisma } from "../utils/db";

export const provinceRoute = new Hono()
  .get("/", async (c) => {
    const provinces = await prisma.province.findMany();

    return c.json(provinces);
  })

  .get("/:slug", async (c) => {
    const { slug } = c.req.param();

    const province = await prisma.province.findUnique({
      where: { slug },
    });

    if (!province) {
      return c.notFound();
    }

    return c.json(province);
  })

  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
      })
    ),

    async (c) => {
      const body = c.req.valid("json");

      try {
        const newProvince = await prisma.province.create({
          data: {
            name: body.name,
            slug: slugify(body.name),
          },
        });

        return c.json({
          message: "Successfully created province!",
          newProvice: newProvince,
        });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          c.status(409);
          return c.json({
            message: `Province with name '${body.name}' already exist.`,
          });
        }

        c.status(500);
        return c.json({ message: "Something wrong with server " });
      }
    }
  );
