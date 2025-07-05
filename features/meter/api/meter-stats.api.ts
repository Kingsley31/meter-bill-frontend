import { apiClient } from "@/lib/http-client";


export type MeterStatsResponse = {
  totalMeters?: number;
  totalActiveMeters?: number;
  totalUnreadMeters?: number;
  totalEnergyConsumed?: number;
  totalEnergyProduced?: number;
  averageEnergyConsumption?: number;
  averageEnergyProduction?: number;
}

export async function getMeterStats(): Promise<MeterStatsResponse> {
  const response = await apiClient.get<MeterStatsResponse>("/meters/stats");
  return response.data;
}