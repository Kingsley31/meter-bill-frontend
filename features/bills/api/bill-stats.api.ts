import { apiClient } from "@/lib/http-client";


export type BillStatsResponse = {
  totalPayable?: number;
  totalPaid?: number;
}

export type BillStatsFilter = {
  areaId?: string;
}

export async function getBillStats(filters:BillStatsFilter): Promise<BillStatsResponse> {
  const params = {
    ...filters,
    ...(filters.areaId && { areaId: filters.areaId }),
  };
  const response = await apiClient.get<BillStatsResponse>("/bills/stats", {
    params,
  });
  return response.data;
}