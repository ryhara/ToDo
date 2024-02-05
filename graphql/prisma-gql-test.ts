import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const coffeeShops = await prisma.todo.findMany({
    where: {
      id: "1",
    },
  });
  console.log(coffeeShops);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });