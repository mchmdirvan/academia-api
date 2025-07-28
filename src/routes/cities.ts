import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";
import { Hono } from "hono";
import z from "zod";

import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

import { prisma } from "../utils/db";
import createSlug from "../utils/slug";

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
            ...body,
            slug: createSlug(body.name),
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

    try {
      const deletedCity = await prisma.city.delete({
        where: { slug: slug },
      });

      return c.json({
        message: `Deleted city with slug ${slug}`,
        deletedCity: deletedCity,
      });
    } catch (error) {
      return c.json({ message: "Failed to delete city.", error });
    }
  })

  .put("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const body = await c.req.json();

    const city = {
      name: body.name,
      slug: createSlug(body.name),
      provinceSlug: body.provinceSlug,
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
