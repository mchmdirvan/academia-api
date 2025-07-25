import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";
import { Hono } from "hono";
import z from "zod";

import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

import { prisma } from "../utils/db";

export const districtRoute = new Hono()
  .get("/", async (c) => {
    const districts = await prisma.district.findMany();

    return c.json(districts);
  })

  .get("/:slug", async (c) => {
    const { slug } = c.req.param();

    const district = await prisma.district.findUnique({
      where: { slug },
    });

    if (!district) {
      return c.notFound();
    }

    return c.json(district);
  })

  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        citySlug: z.string(),
      })
    ),

    async (c) => {
      const body = c.req.valid("json");

      try {
        const newdistrict = await prisma.district.create({
          data: {
            name: body.name,
            slug: slugify(body.name, { lower: true }),
            citySlug: body.citySlug,
          },
          include: {
            city: true,
          },
        });

        return c.json({
          message: "Successfully created district!",
          newProvice: newdistrict,
        });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          c.status(409);
          return c.json({
            message: `District with name '${body.name}' already exist.`,
          });
        }

        c.status(500);
        return c.json({ message: "Something wrong with server " });
      }
    }
  );
