import * as cdk from "aws-cdk-lib";
import { CfnQueryDefinition, LogGroup } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const logGroup = new LogGroup(this, "LogGroup", {});

    new CfnQueryDefinition(this, "QueryDefinition", {
      name: "QueryDefinition",
      logGroupNames: [logGroup.logGroupName],
      queryString: "fields @timestamp, @message | sort @timestamp desc",
    });

    new CfnQueryDefinition(this, "QueryDefinition2", {
      name: "QueryDefinition2",
      logGroupNames: [logGroup.logGroupName],
      queryString: "fields @timestamp, @message | sort @timestamp desc",
    });
  }
}
