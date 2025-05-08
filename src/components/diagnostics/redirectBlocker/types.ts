
export interface RedirectionStatistics {
  detected: number;
  blocked: number;
  lastDetectedUrl?: string;
  lastBlockedUrl?: string;
  lastDetectedTime?: Date;
}

export type BlockingLevel = 'normal' | 'aggressive' | 'permissive';
