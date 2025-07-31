import { apiClient } from "@/lib/http-client";

export type DeleteMeterReadingParams = {
  meterId: string;
  readingId: string;
};

export async function deleteMeterReading(params: DeleteMeterReadingParams) {
    const reponse = await apiClient.delete(`/meters/${params.meterId}/readings/${params.readingId}`);
    return reponse.data;
}