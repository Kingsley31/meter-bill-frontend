import { apiClient } from "@/lib/http-client";


export type UploadMeterReadingPayload = {
  meterId: string;
  readingDate: string;
  kwhReading: number;
  meterImage: string;
};

export async function uploadMeterReading(payload: UploadMeterReadingPayload): Promise<boolean> {
  const response = await apiClient.post(`/meters/${payload.meterId}/readings`, payload);
  return response.data;
}