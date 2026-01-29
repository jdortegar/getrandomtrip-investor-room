import type { SafeDocument } from './Safe';
import type { AccessLog, AnalyticsEvent } from './Analytics';

export interface Investor {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  profileComplete: boolean;
  approved: boolean;
  approvedAt?: Date;
  approvedBy?: string;
  magicLinkSent: boolean;
  magicLinkSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvestorWithRelations extends Investor {
  safeDocuments?: SafeDocument[];
  accessLogs?: AccessLog[];
  analytics?: AnalyticsEvent[];
}
