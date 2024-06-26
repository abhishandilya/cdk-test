#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { CdkStack as RDS } from "../lib/rds";

const app = new cdk.App();

new RDS(app, "RDS", {});
