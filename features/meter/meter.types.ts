
export type MeterConsumptionChartData = {
    month: string;
    consumption: number;
};


export type MeterReading = {
  id: string;
  meterId: string;
  meterNumber: string;
  kwhReading: number;
  kwhConsumption: number;
  readingDate: string; // ISO date string
  meterImage: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string
}
