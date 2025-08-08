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

export type MeterStatsFilter = {
  areaId?: string;
}

export async function getMeterStats(filters:MeterStatsFilter): Promise<MeterStatsResponse> {
  const params = {
    ...filters,
    ...(filters.areaId && { areaId: filters.areaId }),
  };
  const response = await apiClient.get<MeterStatsResponse>("/meters/stats", {
    params,
  });
  return response.data;
}