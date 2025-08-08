import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { AreaTariff } from "../area.types";


export type ListAreaTariffsFilters = {
  effectiveFromStart?: string;
  effectiveFromEnd?: string;
  tariff?: number;
  page?: number;
  pageSize: number;
  areaId: string;
};

export async function listAreaTariffs(filters: ListAreaTariffsFilters): Promise<PaginatedResponse<AreaTariff>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.effectiveFromStart && { effectiveFromStart: filters.effectiveFromStart }),
    ...(filters.effectiveFromEnd && { effectiveFromEnd: filters.effectiveFromEnd }),
    ...(filters.tariff && { tariff: filters.tariff }),
  };

  const response = await apiClient.get<PaginatedResponse<AreaTariff>>(`/areas/${filters.areaId}/tariffs`, {
    params,
  });
  return response.data;
}