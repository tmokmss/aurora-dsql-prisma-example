# Aurora DSQL x Prisma example

Detailed explanation is here (Japanese): [Aurora DSQLをPrismaで使う](https://tmokmss.hatenablog.com/entry/aurora-dsql-with-prisma-orm)

## Usage

First, create a DSQL cluster: https://docs.aws.amazon.com/aurora-dsql/latest/userguide/getting-started.html#getting-started-create-cluster

Then, rewrite `hostname` variables found in `init.ts` and `init.mts` with the created endpoint, and run the following commands:

```sh
npm ci
npx tsx index.ts
npx tsx top-level.mts
npx tsx driver.mts

npx tsx migration-runner.ts

# try on Lambda
npx cdk deploy
```
