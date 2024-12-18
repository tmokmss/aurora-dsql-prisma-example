import { setTimeout } from 'timers/promises';
import { getClient } from './init';
import { randomBytes } from 'crypto';

const main = async () => {
  while (true) {
    const prisma = await getClient();
    // await prisma.user.deleteMany();
    const user = await prisma.user.create({
      data: {
        id: randomBytes(10).toString('hex'),
      },
    });
    console.log(user.id);
    await prisma.$disconnect();
    await setTimeout(300);

    // await Promise.all([
    //   prisma.user.create({
    //     data: {
    //       id: randomBytes(10).toString('hex'),
    //     },
    //   }),
    //   prisma.user.create({
    //     data: {
    //       id: randomBytes(10).toString('hex'),
    //     },
    //   }),
    // ]);
    // const users = await prisma.user.findMany();
    // console.log(JSON.stringify(users));
  }
};

main();
