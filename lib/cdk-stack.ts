import * as cdk from "aws-cdk-lib";
import { HttpApi, HttpNoneAuthorizer } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpJwtAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, "lambda", {
      runtime: Runtime.NODEJS_20_X,
    });

    const issuer = `https://lynkwell-prod.us.auth0.com/`;
    const audience = `https://api.lynkwell.com`;

    const jwtAuthorizer = new HttpJwtAuthorizer("Auth0Authorizer", issuer, {
      jwtAudience: [audience],
      authorizerName: "Auth0Authorizer",
    });

    const api = new HttpApi(this, "api", {
      defaultAuthorizer: jwtAuthorizer,
    });

    api.addRoutes({
      path: "/default",
      integration: new HttpLambdaIntegration("lambda", lambda),
    });

    api.addRoutes({
      path: "/",
      integration: new HttpLambdaIntegration("lambda", lambda),
      authorizer: new HttpNoneAuthorizer(),
    });
  }
}
