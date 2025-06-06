
import { CloudWatchClient, PutMetricDataCommand, StandardUnit } from "@aws-sdk/client-cloudwatch";
import { toast } from "sonner";

// Configuration
const REGION = "us-east-1";
const NAMESPACE = "GamePathAI";
const IS_DEV = process.env.NODE_ENV === "development";

// Initialize the CloudWatch client (if credentials are available)
let cloudWatchClient: CloudWatchClient | null = null;

// Try to initialize the CloudWatch client
try {
  // In a real application, credentials would be provided through environment variables
  // or IAM roles if running in AWS
  cloudWatchClient = new CloudWatchClient({
    region: REGION,
    // In development, we might use local credentials
    ...(IS_DEV && {
      credentials: {
        accessKeyId: localStorage.getItem("aws_access_key_id") || "",
        secretAccessKey: localStorage.getItem("aws_secret_access_key") || ""
      }
    })
  });
} catch (error) {
  console.error("Failed to initialize CloudWatch client:", error);
}

// Function to check if CloudWatch integration is available
export const isCloudWatchAvailable = (): boolean => {
  return cloudWatchClient !== null;
};

// Map string units to AWS StandardUnit enum values
const mapToStandardUnit = (unit: string): StandardUnit => {
  switch (unit.toLowerCase()) {
    case "milliseconds":
      return StandardUnit.Milliseconds;
    case "percent":
      return StandardUnit.Percent;
    case "count":
      return StandardUnit.Count;
    case "bytes":
      return StandardUnit.Bytes;
    case "bits":
      return StandardUnit.Bits;
    case "seconds":
      return StandardUnit.Seconds;
    default:
      return StandardUnit.None;
  }
};

// Function to publish a metric data point to CloudWatch
export const publishMetric = async (
  metricName: string,
  value: number,
  unit: string = "None",
  dimensions: Record<string, string> = {}
): Promise<boolean> => {
  if (!cloudWatchClient) {
    console.log("CloudWatch client not initialized, skipping metric publishing");
    return false;
  }

  try {
    // Convert dimensions to CloudWatch format
    const dimensionsList = Object.entries(dimensions).map(([Name, Value]) => ({
      Name,
      Value
    }));

    // Create the command with proper StandardUnit conversion
    const command = new PutMetricDataCommand({
      Namespace: NAMESPACE,
      MetricData: [
        {
          MetricName: metricName,
          Value: value,
          Unit: mapToStandardUnit(unit), // Convert string to StandardUnit enum
          Dimensions: dimensionsList,
          Timestamp: new Date()
        }
      ]
    });

    // Send the metric data
    await cloudWatchClient.send(command);
    return true;
  } catch (error) {
    console.error(`Failed to publish metric ${metricName}:`, error);
    return false;
  }
};

export const cloudwatchClient = {
  isAvailable: isCloudWatchAvailable,
  publishMetric
};
