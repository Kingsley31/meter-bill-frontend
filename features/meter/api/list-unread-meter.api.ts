import { apiClient } from "@/lib/http-client";
import { Meter } from "@/shared/meter/types";
import { PaginatedResponse } from "@/types/paginated.respone.type";

export type ListUnreadMeterFilters = {
  search?: string;
  areaId?: string;
  type?: string;
  purpose?: string;
  page?: number;
  pageSize: number;
  startDate: string;
  endDate: string;
};

export async function listUnreadMeters(filters: ListUnreadMeterFilters): Promise<PaginatedResponse<Meter>> {
  const params = {
    ...filters,
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
    ...(filters.areaId && { areaId: filters.areaId }),
    ...(filters.type && { type: filters.type }),
    ...(filters.purpose && { purpose: filters.purpose }),
  };

  const response = await apiClient.get<PaginatedResponse<Meter>>("/meters/unread", {
    params,
  });
  return response.data;
}