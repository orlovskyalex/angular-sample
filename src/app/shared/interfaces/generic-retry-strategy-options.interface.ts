export interface GenericRetryStrategyOptions {
  maxRetryAttempts?: number;
  scalingDuration?: number;
  excludedStatusCodes?: number[];
  log?: boolean;
}
