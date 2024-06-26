import * as cdk from "aws-cdk-lib";
import { InstanceClass, InstanceSize, InstanceType, Vpc } from "aws-cdk-lib/aws-ec2";
import { DatabaseInstance, DatabaseInstanceEngine, PostgresEngineVersion } from "aws-cdk-lib/aws-rds";
import { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'Vpc', {});

    const stage = 'production';
    const dbMasterUserName = 'metric_admin';
    new DatabaseInstance(this, 'PgsqlDatabase', {
      // instanceIdentifier: `metric-${stage}`,
      // credentials: { username: dbMasterUserName, encryptionKey, secretName: 'metric_admin' },
      // iamAuthentication: true,
      // vpcSubnets: {
      //   subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      // },
      // deletionProtection: stage === 'production',
      // copyTagsToSnapshot: true,
      // cloudwatchLogsExports: ['postgresql', 'upgrade'],
      vpc,
      // port,
      // caCertificate: CaCertificate.RDS_CA_ECC384_G1,
      engine: DatabaseInstanceEngine.postgres({ version: PostgresEngineVersion.VER_16_1 }),
      // monitoringInterval: Duration.seconds(30),
      // securityGroups: [dbSecurityGroup],
      // cloudwatchLogsRetention: RetentionDays.THREE_MONTHS,
      // networkType: NetworkType.IPV4,
      // storageEncrypted: true,
      // allocatedStorage: 200,
      // backupRetention: Duration.days(7),
      // databaseName: 'metric',
      // enablePerformanceInsights: true,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.SMALL),
      // maxAllocatedStorage: 200,
      // publiclyAccessible: false,
      // deleteAutomatedBackups: true,
      // multiAz: true,
      // storageEncryptionKey: new Key(this, 'DbStorageEncryptionKey', {
      //   removalPolicy: RemovalPolicy.DESTROY,
      //   enableKeyRotation: true,
      //   alias: 'lynkwell/rds/metric/DbStorageEncryptionKey',
      // }),
      // subnetGroup: new SubnetGroup(this, 'DbSubnetGroup', {
      //   vpc: props.resources.vpc,
      //   description: 'This instance should live inside private subnets',
      //   removalPolicy: RemovalPolicy.DESTROY,
      //   subnetGroupName: 'MetricDbSubnetGroup',
      //   vpcSubnets: props.resources.vpc.selectSubnets({
      //     onePerAz: true,
      //     subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      //   }),
      // }),
    });
  }
}
