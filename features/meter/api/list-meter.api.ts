import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Meter } from "../meter.types";

export type ListMeterFilters = {
  search?: string;
  areaId?: string;
  type?: string;
  purpose?: string;
  meterNumber?: string;
  customerId?: string;
  customerName?: string;
  page?: number;
  pageSize: number;
};

export async function listMeters(filters: ListMeterFilters): Promise<PaginatedResponse<Meter>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
    ...(filters.areaId && { areaId: filters.areaId }),
    ...(filters.type && { type: filters.type }),
    ...(filters.purpose && { purpose: filters.purpose }),
    ...(filters.meterNumber && { meterNumber: filters.meterNumber }),
    ...(filters.customerId && { customerId: filters.customerId }),
    ...(filters.customerName && { customerName: filters.customerName }),
  };

  const response = await apiClient.get<PaginatedResponse<Meter>>("/meters", {
    params,
  });
  return response.data;
}