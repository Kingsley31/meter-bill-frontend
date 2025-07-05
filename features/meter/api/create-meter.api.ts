import { apiClient } from "@/lib/http-client";
import { Meter } from "../meter.types";
import { MeterPurpose, MeterType, Operaor } from "../meter.enums";

export type CreateMeterPayload = {
  meterNumber: string;
  areaId: string;
  areaName: string;
  location: string;
  ctRating: number;
  ctMultiplierFactor: number;
  purpose: MeterPurpose;
  type: MeterType;
  calculationReferenceMeterId?: string;
  hasMaxKwhReading: boolean;
  maxKwhReading?: number;
  subMeters?: {
    subMeterId: string;
    operator: Operaor;
  }[];
};

export async function createMeter(payload: CreateMeterPayload): Promise<Meter> {
  const response = await apiClient.post("/meters", payload);
  return response.data;
}