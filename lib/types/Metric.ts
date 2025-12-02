export interface Metric {
  id: string;
  name: string;
  value: number;
  unit?: string;
  period?: string;
  updatedAt: Date;
  updatedBy?: string;
}

export interface MetricInput {
  name: string;
  value: number;
  unit?: string;
  period?: string;
  updatedBy?: string;
}

