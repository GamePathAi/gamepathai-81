
import { pingService } from "./metrics/pingService";
import { jitterService } from "./metrics/jitterService";
import { fpsService } from "./metrics/fpsService";
import { systemService } from "./metrics/systemService";

// Export all metric services with proper naming
export const metricsService = {
  ...pingService,
  ...jitterService,
  ...fpsService,
  ...systemService
};
