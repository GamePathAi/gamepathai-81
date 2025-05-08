
export type BackendStatus = 'checking' | 'online' | 'offline';
export type MlEndpointStatus = 'checking' | 'online' | 'offline';

export interface DiagnosticsResults {
  timestamp: string;
  backendStatus: BackendStatus;
  mlEndpointStatus: MlEndpointStatus;
  interfereingExtensions?: string[];
}
