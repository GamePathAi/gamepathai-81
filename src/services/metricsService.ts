
import { pingService } from "./metrics/pingService";
import { jitterService } from "./metrics/jitterService";
import { fpsService } from "./metrics/fpsService";
import { systemService } from "./metrics/systemService";

export const metricsService = {
  ...pingService,
  ...jitterService,
  ...fpsService,
  ...systemService
};
