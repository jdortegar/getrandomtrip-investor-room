export enum DocumentType {
  SAFE_TEMPLATE = 'SAFE_TEMPLATE',
  BYLAWS = 'BYLAWS',
  CAP_TABLE = 'CAP_TABLE',
  ROADMAP = 'ROADMAP',
  P_L = 'P_L',
  DUE_DILIGENCE = 'DUE_DILIGENCE',
}

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  filePath: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

