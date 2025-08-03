import { apiClient } from "@/lib/http-client";
import { MeterPurpose, MeterType, Operaor } from "@/shared/meter/enums";


export type EditMeterPayload = {
  meterId: string;
  meterNumber?: string;
  areaId?: string;
  areaName?: string;
  location?: string;
  ctRating: number;
  ctMultiplierFactor: number;
  purpose?: MeterPurpose;
  type?: MeterType;
  calculationReferenceMeterId?: string;
  hasMaxKwhReading: boolean;
  maxKwhReading?: number;
  subMeters?: {
    subMeterId: string;
    operator: Operaor;
  }[];
};

export async function editMeter(payload: EditMeterPayload): Promise<boolean> {
  const response = await apiClient.patch(`/meters/${payload.meterId}`, payload);
  return response.data;
}