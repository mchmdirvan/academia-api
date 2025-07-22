import { PrismaClient } from "../src/generated/prisma";
import createSlug from "../src/utils/slug";
import { dataCities } from "./data/cities";
import { dataDistricts } from "./data/district";

import { dataProvinces } from "./data/provinces";
import { dataSchools } from "./data/schools";

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

  for (const seedDistrict of dataDistricts) {
    const slug = createSlug(seedDistrict.name);

    const district = await prisma.district.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...seedDistrict,
      },
    });

    console.log(`🆕 District: ${district.name}`);
  }

  for (const seedSchool of dataSchools) {
    const slug = createSlug(seedSchool.name);

    const school = await prisma.school.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        ...seedSchool,
      },
    });
    console.log(`🆕 School: ${school.name}`);
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
