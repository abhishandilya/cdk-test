import * as cdk from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const enableRotateSecret = (secretName: string) => {
        const rotationFunction = new NodejsFunction(this, `lambda`, {
          handler: 'main',
          timeout: cdk.Duration.minutes(5),
          environment: {
            SECRET_NAME: secretName,
          },
        });
  
        const secret = Secret.fromSecretNameV2(this, secretName, secretName);
        secret.addRotationSchedule(`${secretName}RotationSchedule`, {
          rotationLambda: rotationFunction,
          automaticallyAfter: cdk.Duration.hours(12),
          rotateImmediatelyOnUpdate: true,
        });
        secret.grantWrite(rotationFunction);
      };

    enableRotateSecret('niacin-billing');

    
  }
}
