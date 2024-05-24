import * as cdk from "aws-cdk-lib";
import { CfnQueryDefinition, LogGroup } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LogGroup(this, "LogGroupAlone", {});
  }
}
