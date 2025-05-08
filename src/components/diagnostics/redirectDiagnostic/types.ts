
export interface RedirectTest {
  url: string;
  redirected: boolean;
  target?: string;
  isGamePathAI?: boolean;
  status?: number | null;
  error?: string;
}

export type ConnectionStatus = 'unknown' | 'online' | 'offline';
