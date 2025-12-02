export enum SafeStatus {
  GENERATED = 'GENERATED',
  PENDING_SIGNATURE = 'PENDING_SIGNATURE',
  SIGNED = 'SIGNED',
}

export interface SafeDocument {
  id: string;
  investorId: string;
  amount: number;
  valuationCap?: number;
  discountRate?: number;
  mfn: boolean;
  pdfPath?: string;
  docusignId?: string;
  status: SafeStatus;
  generatedAt: Date;
  signedAt?: Date;
}

export interface SafeDocumentInput {
  amount: number;
  valuationCap?: number;
  discountRate?: number;
  mfn?: boolean;
}

