#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStack as Query } from "../lib/query";
import { CdkStack as LogGroup } from "../lib/logroup";
import {CdkStack as SecretRotation} from "../lib/secretRotation";

const app = new cdk.App();
new Query(app, "Query", {
  env: {
    account: "531366837705",
  },
});

new LogGroup(app, "LogGroup", {
  env: {
    account: "531366837705",
  },
});

new SecretRotation(app, 'SecretRotation', {});
