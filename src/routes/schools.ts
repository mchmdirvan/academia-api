import { zValidator } from "@hono/zod-validator";
import slugify from "slugify";
import { Hono } from "hono";
import z from "zod";

import { PrismaClientKnownRequestError } from "../generated/prisma/runtime/library";

import { prisma } from "../utils/db";

export const schoolRoute = new Hono()
  .get("/", async (c) => {
    const schools = await prisma.school.findMany();

    return c.json(schools);
  })

  .get("/:slug", async (c) => {
    const { slug } = c.req.param();

    const school = await prisma.school.findUnique({
      where: { slug },
    });

    if (!school) {
      return c.notFound();
    }

    return c.json(school);
  })

  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        npsn: z.string(),
        address: z.string(),
        provinceSlug: z.string(),
        citySlug: z.string(),
        districtSlug: z.string(),
      })
    ),

    async (c) => {
      const body = c.req.valid("json");

      try {
        const newschool = await prisma.school.create({
          data: {
            ...body,
            slug: slugify(body.name, { lower: true }),
          },
          include: {
            province: true,
            city: true,
            district: true,
          },
        });

        return c.json({
          message: "Successfully created school!",
          newProvice: newschool,
        });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          c.status(409);
          return c.json({
            message: `School with name '${body.name}' already exist.`,
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
      const deletedSchool = await prisma.school.delete({
        where: { slug: slug },
      });

      return c.json({
        message: `Deleted school with slug ${slug}`,
        deletedSchool: deletedSchool,
      });
    } catch (error) {
      console.log(error);
    }
  })

  .put("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const body = await c.req.json();

    const school = {
      ...body,
      slug: slugify(body.name, { lower: true }),
    };

    const updatedSchool = await prisma.school.update({
      where: { slug: slug },
      data: school,
    });

    return c.json({
      message: `Updated school with slug ${slug}`,
      updatedSchool: updatedSchool,
    });
  });
