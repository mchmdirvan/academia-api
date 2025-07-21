import { Hono } from "hono";
import { cors } from "hono/cors";

import { zValidator } from "@hono/zod-validator";
import z from "zod";

import { prisma } from "./utils/db";
import createSlug from "./utils/slug";
import { PrismaClientKnownRequestError } from "./generated/prisma/runtime/library";

const app = new Hono();

app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    message: "School API",
    schools: "/schools",
  });
});

app.get("/provinces", async (c) => {
  const provinces = await prisma.province.findMany();

  return c.json(provinces);
});

app.get("/provinces/:slug", async (c) => {
  const slug = c.req.param("slug");

  const province = await prisma.province.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!province) {
    c.notFound();
  }

  return c.json(province);
});

app.post(
  "/provinces",
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
          slug: createSlug(body.name),
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
          message: `Provinsi dengan nama '${body.name}' sudah ada.`,
        });
      }

      c.status(500);
      return c.json({ message: "Terjadi kesalahan pada server." });
    }
  }
);

export default app;
