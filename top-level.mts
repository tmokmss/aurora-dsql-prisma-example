import { setTimeout } from 'timers/promises';
import { randomBytes } from 'crypto';
import { prisma } from './init.mts';

const main = async () => {
  // await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      id: randomBytes(10).toString('hex'),
    },
  });
  await prisma.$disconnect();
  await setTimeout(4000);

  await Promise.all([
    prisma.user.create({
      data: {
        id: randomBytes(10).toString('hex'),
      },
    }),
    prisma.user.create({
      data: {
        id: randomBytes(10).toString('hex'),
      },
    }),
  ]);
  const users = await prisma.user.findMany();
  console.log(JSON.stringify(users));
};

main();
