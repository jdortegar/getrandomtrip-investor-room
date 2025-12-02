export interface AccessLog {
  id: string;
  investorId?: string;
  documentId?: string;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  investorId?: string;
  event: string;
  properties?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

