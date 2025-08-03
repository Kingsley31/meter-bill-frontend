import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { MeterWithConsumptionChangePercent } from "../meter.types";


export type ListConsumptionExceptionMeterFilters = {
  search?: string;
  areaId?: string;
  type?: string;
  purpose?: string;
  page?: number;
  pageSize: number;
};

export async function listConsumptionExceptionMeters(filters: ListConsumptionExceptionMeterFilters): Promise<PaginatedResponse<MeterWithConsumptionChangePercent>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
    ...(filters.areaId && { areaId: filters.areaId }),
    ...(filters.type && { type: filters.type }),
    ...(filters.purpose && { purpose: filters.purpose }),
  };

  const response = await apiClient.get<PaginatedResponse<MeterWithConsumptionChangePercent>>("/meters/consumption-exceptions", {
    params,
  });
  console.log(response.data);
  return response.data;
}