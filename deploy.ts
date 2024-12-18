import { App, Duration, Stack } from 'aws-cdk-lib';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

const app = new App();
const stack = new Stack(app, 'DSQLTestStack');
const issuer = new NodejsFunction(stack, 'Issuer', {
  timeout: Duration.minutes(15),
  entry: './handler.ts',
  runtime: Runtime.NODEJS_22_X,
  bundling: {
    externalModules: [],
    nodeModules: ['prisma', '@prisma/client'],
    commandHooks: {
      beforeInstall: (i, o) => [
        // Copy prisma directory to Lambda code asset
        // the directory must be placed on the same directory as your Lambda code
        `cp -r ${i}/prisma ${o}`,
      ],
      beforeBundling: (i, o) => [],
      afterBundling: (i, o) => [],
    },
    forceDockerBundling: true,
  },
  depsLockFilePath: './package-lock.json',
});
issuer.role!.addToPrincipalPolicy(
  new PolicyStatement({
    actions: ['dsql:DbConnectAdmin', 'dsql:DbConnect'],
    resources: ['*'],
  })
);
