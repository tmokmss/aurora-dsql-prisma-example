import { setTimeout } from 'timers/promises';
import { getClient } from './init';
import { randomBytes } from 'crypto';

export const handler = async () => {
  const prisma = await getClient();

  const start = Date.now();
  await prisma.user.deleteMany();
  while (true) {
    await prisma.user.create({
      data: {
        id: randomBytes(10).toString('hex'),
      },
    });
    await prisma.$disconnect();
    await setTimeout(10000);
    console.log(`elapsed time: ${(Date.now() - start) / 1000} seconds`);
  }
};
