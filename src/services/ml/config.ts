
/**
 * ML API configuration constants
 */

// Base URL and environment configuration
export const ML_BASE_URL = "/ml"; // Use /ml prefix for all ML requests
export const isDev = process.env.NODE_ENV === 'development';

// Retry configuration
export const MAX_RETRIES = 2;
export const RETRY_DELAY = 2000; // 2 seconds

// Request timeout duration (in milliseconds)
export const REQUEST_TIMEOUT = 20000; // 20 seconds
