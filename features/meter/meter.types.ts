import { MeterPurpose, MeterType, Operaor } from "./meter.enums";

export type SubMeter = {
  meterId: string;
  subMeterId: string;
  operator: Operaor;
};

export type MeterConsumptionChartData = {
    month: string;
    consumption: number;
};

export type Meter = {
  id: string;
  meterNumber: string;
  areaId: string;
  areaName: string;
  location: string;
  ctMultiplierFactor: number;
  purpose: MeterPurpose;
  type: MeterType;
  hasMaxKwhReading: boolean;
  maxKwhReading?: number;
  subMeters: SubMeter[];
  ctRating: number;
  isActive: boolean;
  customerId: string;
  customerName: string;
  tariff: number;
  currentKwhReading: number;
  currentKwhReadingDate: string; // ISO date string
  lastBillKwhConsumption: number;
  calculationReferenceMeterId?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string or undefined
};