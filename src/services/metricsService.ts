
import { awsMetricsService } from "./metrics/awsMetricsService";
import { pingService } from "./metrics/pingService";
import { jitterService } from "./metrics/jitterService";
import { fpsService } from "./metrics/fpsService";
import { systemService } from "./metrics/systemService";
import { useAwsIntegration } from "@/hooks/useAwsIntegration";

// Determine which service to use
const determineActiveServices = () => {
  // For now, we'll use AWS services for consistent behavior
  // This could be extended to conditionally use local services when offline
  return {
    ...pingService,
    ...jitterService,
    ...fpsService,
    ...systemService,
    ...awsMetricsService
  };
};

// Export all metric services with proper merging
export const metricsService = determineActiveServices();
