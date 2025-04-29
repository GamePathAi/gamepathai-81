
import { baseApiClient } from './baseApiClient';
import { testBackendConnection, testAWSConnection } from './connectionTester';

// Export the API client
export const apiClient = baseApiClient;

// Export connection testing functions
export { testBackendConnection, testAWSConnection };
