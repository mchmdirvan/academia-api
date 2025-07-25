import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";
import { Hono } from "hono";
import z from "zod";

import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

import { prisma } from "../utils/db";

export const citiesRoute = new Hono()
  .get("/", async (c) => {
    const cities = await prisma.city.findMany();

    return c.json(cities);
  })

  .get("/:slug", async (c) => {
    const { slug } = c.req.param();

    const city = await prisma.city.findUnique({
      where: { slug },
    });

    if (!city) {
      return c.notFound();
    }

    return c.json(city);
  })

  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        provinceSlug: z.string(),
      })
    ),

    async (c) => {
      const body = c.req.valid("json");

      try {
        const newcity = await prisma.city.create({
          data: {
            name: body.name,
            slug: slugify(body.name),
            provinceSlug: body.provinceSlug,
          },
          include: {
            province: true,
          },
        });

        return c.json({
          message: "Successfully created city!",
          newProvice: newcity,
        });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          c.status(409);
          return c.json({
            message: `City with name '${body.name}' already exist.`,
          });
        }

        c.status(500);
        return c.json({ message: "Something wrong with server " });
      }
    }
  )

  .delete("/:slug", async (c) => {
    const slug = c.req.param("slug");

    const deletedCity = await prisma.city.delete({
      where: { slug: slug },
    });

    return c.json({
      message: `Deleted city with slug ${slug}`,
      deletedCity: deletedCity,
    });
  })

  .put("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const body = await c.req.json();

    const city = {
      name: body.name,
      slug: slugify(body.name),
    };

    const updatedCity = await prisma.city.update({
      where: { slug: slug },
      data: city,
    });

    return c.json({
      message: `Updated province with slug ${slug}`,
      updatedCity,
    });
  });
