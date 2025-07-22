import { PrismaClient } from "../src/generated/prisma";
import createSlug from "../src/utils/slug";
import { dataCities } from "./data/cities";

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

  for (const seedCity of dataCities) {
    const slug = createSlug(seedCity.name);

    const city = await prisma.city.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...seedCity,
      },
    });

    console.log(`🆕 Provincy: ${city.name}`);
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
