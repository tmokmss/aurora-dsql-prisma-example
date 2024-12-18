// DATABASE_URL="${DATABASE_ENGINE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}${DATABASE_OPTION}"
import { DsqlSigner } from '@aws-sdk/dsql-signer';
import { PrismaClient } from '@prisma/client';

const region = 'us-east-1';
const hostname = 'example.dsql.us-east-1.on.aws';

async function generateToken() {
  const signer = new DsqlSigner({
    hostname,
    region,
    expiresIn: 24 * 3600 * 7,
  });
  return await signer.getDbConnectAdminAuthToken();
}

const getClient = async () => {
  const token = await generateToken();
  console.log(token);
  process.env.DATABASE_URL = `postgres://admin:${encodeURIComponent(token)}@${hostname}:5432/postgres`;
  return new PrismaClient();
};

export const prisma = await getClient();
