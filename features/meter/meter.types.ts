import { Meter } from "@/shared/meter/types";

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

export type MeterTariff = {
  id: string;
  meterId: string;
  tariff: number;
  effectiveFrom: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string
}

export type MeterWithConsumptionChangePercent = Meter & {consumptionChangePercent: number};