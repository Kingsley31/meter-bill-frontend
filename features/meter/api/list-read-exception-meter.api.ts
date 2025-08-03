import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Meter } from "@/shared/meter/types";


export type ListReadExceptionMeterFilters = {
  search?: string;
  areaId?: string;
  type?: string;
  purpose?: string;
  page?: number;
  pageSize: number;
};

export async function listReadExceptionMeters(filters: ListReadExceptionMeterFilters): Promise<PaginatedResponse<Meter>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
    ...(filters.areaId && { areaId: filters.areaId }),
    ...(filters.type && { type: filters.type }),
    ...(filters.purpose && { purpose: filters.purpose }),
  };

  const response = await apiClient.get<PaginatedResponse<Meter>>("/meters/reading-exceptions", {
    params,
  });
  return response.data;
}