import { MeterPurpose, MeterType, Operaor } from "./enums";

export type SubMeter = {
  meterId: string;
  subMeterId: string;
  operator: Operaor;
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
  totalCustomers: number;
  currentKwhReading: number;
  currentKwhReadingDate: string; // ISO date string
  currentKwhConsumption: number;
  previousKwhReading: number;
  previousKwhConsumption: number;
  previousKwhReadingDate: string; // ISO date string
  lastBillKwhConsumption: number;
  lastBillDate?: string; // ISO date string
  lastBillAmount: number;
  calculationReferenceMeterId?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string or undefined
};