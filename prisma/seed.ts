import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const province = await prisma.province.upsert({
    where: { slug: "dki-jakarta" },
    update: {},
    create: {
      name: "DKI Jakarta",
      slug: "dki-jakarta",
    },
  });

  console.log(province);
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
