import { apiClient } from "@/lib/http-client";


export type AreaStatsResponse = {
  totalAreas: number;
  totalUnassignedAreas: number;
}

export async function getAreaStats(): Promise<AreaStatsResponse> {
  const response = await apiClient.get<AreaStatsResponse>("/areas/stats");
  return response.data;
}