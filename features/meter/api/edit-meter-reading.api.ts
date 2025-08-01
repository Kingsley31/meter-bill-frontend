import { apiClient } from "@/lib/http-client";


export type EditMeterReadingPayload = {
  meterId: string;
  readingId: string;
  readingDate: string;
  kwhReading: number;
  meterImage: string;
  reason: string;
};

export async function editMeterReading(payload: EditMeterReadingPayload): Promise<boolean> {
  const response = await apiClient.patch(`/meters/${payload.meterId}/readings/${payload.readingId}`, payload);
  return response.data;
}