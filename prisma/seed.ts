import { PrismaClient } from "../src/generated/prisma";
import createSlug from "../src/utils/slug";

import { dataProvinces } from "./data/provinces";

const prisma = new PrismaClient();

async function main() {
  for (const seedProvince of dataProvinces) {
    const slug = createSlug(seedProvince.name);

    const province = await prisma.province.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...seedProvince,
      },
    });

    console.log(`🆕 Provincy: ${province.name}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
