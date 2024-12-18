import { setTimeout } from 'timers/promises';
import { getClient } from './init';
import { randomBytes } from 'crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { DsqlSigner } from '@aws-sdk/dsql-signer';

const region = 'us-east-1';
const hostname = 'example.dsql.us-east-1.on.aws';

const pool = new Pool({
  host: hostname,
  user: 'admin',
  database: 'postgres',
  port: 5432,
  ssl: true,
  password: async () => {
    console.log(`establishing connection...`);
    const signer = new DsqlSigner({
      hostname,
      region,
      expiresIn: 3, //24 * 3600 * 7,
    });
    const token = await signer.getDbConnectAdminAuthToken();
    return token;
  },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const main = async () => {
  // await prisma.user.deleteMany();
  while (true) {
    const user = await prisma.user.create({
      data: {
        id: randomBytes(10).toString('hex'),
      },
    });
    console.log(`created ${user.id}`);

    // await pool.end();
    // await prisma.$disconnect();
    await setTimeout(4000);

    // const users = await prisma.user.findMany();
    // console.log(JSON.stringify(users));
  }
};

main();
