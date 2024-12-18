// DATABASE_URL="${DATABASE_ENGINE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}${DATABASE_OPTION}"
import { DsqlSigner } from '@aws-sdk/dsql-signer';
import { PrismaClient } from '@prisma/client';

const region = 'us-east-1';
const hostname = 'example.dsql.us-east-1.on.aws';

async function generateToken() {
  const signer = new DsqlSigner({
    hostname,
    region,
    expiresIn: 12,
  });
  return await signer.getDbConnectAdminAuthToken();
}

let client: PrismaClient | undefined = undefined;
let lastEstablieshedAt = 0;
export const getClient = async () => {
  if (client) {
    if (Date.now() - lastEstablieshedAt < 10000) {
      return client;
    } else {
      await client.$disconnect();
    }
  }
  console.log(`establishing connection....`);
  lastEstablieshedAt = Date.now();
  const token = await generateToken();
  process.env.DATABASE_URL = `postgres://admin:${encodeURIComponent(token)}@${hostname}:5432/postgres`;
  client = new PrismaClient();
  return client;
};
