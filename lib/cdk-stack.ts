import * as cdk from "aws-cdk-lib";
import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { HttpMethod } from "aws-cdk-lib/aws-events";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { join } from "path";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new HttpApi(this, "Api", {});

    const lambda1 = new NodejsFunction(this, "CdkFunction1");
    const lambda2 = new NodejsFunction(this, "CdkFunction2");

    api.addRoutes({
      methods: [HttpMethod.GET],
      path: "/credentials",
      integration: new HttpLambdaIntegration("without-slash", lambda1),
    });

    api.addRoutes({
      methods: [HttpMethod.GET],
      path: "/credentials/{x}",
      integration: new HttpLambdaIntegration("without-slash", lambda2),
    });

    // api.addRoutes({
    //   methods: [HttpMethod.GET],
    //   path: "/credentials/{proxy+}",
    //   integration: new HttpLambdaIntegration("proxy", lambda),
    // });
  }
}
