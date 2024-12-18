# Aurora DSQL x Prisma example

Detailed explanation is here (Japanese): [Aurora DSQLをPrismaで使う]()

## Usage

Rewrite `hostname` variables found in `init.ts` or `init.mts`, etc and run the following commands:

```sh
npm ci
npx tsx index.ts
npx tsx top-level.mts
npx tsx driver.mts

# try on Lambda
npx cdk deploy
```
