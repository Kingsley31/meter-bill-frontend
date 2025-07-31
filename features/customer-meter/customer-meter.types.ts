import { Meter } from "@/shared/meter/types";

export type CustomerMeter = {
  id: string;
  meterId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  meter: Meter;
  meterNumber: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string or undefined
};