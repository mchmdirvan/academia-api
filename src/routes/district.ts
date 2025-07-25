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
            ...body,
            slug: slugify(body.name, { lower: true }),
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
  )

  .delete("/:slug", async (c) => {
    const slug = c.req.param("slug");

    try {
      const deletedDistrict = await prisma.district.delete({
        where: { slug: slug },
      });

      return c.json({
        message: `Deleted district with slug ${slug}`,
        deletedDistrict: deletedDistrict,
      });
    } catch (error) {
      console.log(error);
    }
  })

  .put("/:slug", async (c) => {
    const slug = c.req.param("slug");
    const body = await c.req.json();

    const district = {
      ...body,
      slug: slugify(body.name, { lower: true }),
    };

    const updatedistrict = await prisma.district.update({
      where: { slug: slug },
      data: district,
    });

    return c.json({
      message: `Updated district with slug ${slug}`,
      updatedistrict,
    });
  });
