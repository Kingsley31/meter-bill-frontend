import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { MeterTariff } from "../meter.types";


export type ListMeterTariffsFilters = {
  effectiveFromStart?: string;
  effectiveFromEnd?: string;
  tariff?: number;
  page?: number;
  pageSize: number;
  meterId: string;
};

export async function listMeterTariffs(filters: ListMeterTariffsFilters): Promise<PaginatedResponse<MeterTariff>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.effectiveFromStart && { effectiveFromStart: filters.effectiveFromStart }),
    ...(filters.effectiveFromEnd && { effectiveFromEnd: filters.effectiveFromEnd }),
    ...(filters.tariff && { tariff: filters.tariff }),
  };

  const response = await apiClient.get<PaginatedResponse<MeterTariff>>(`/meters/${filters.meterId}/tariffs`, {
    params,
  });
  return response.data;
}