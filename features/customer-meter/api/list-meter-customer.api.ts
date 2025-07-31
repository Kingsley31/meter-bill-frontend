import { PaginatedResponse } from "@/types/paginated.respone.type";
import { CustomerMeter } from "../customer-meter.types";
import { apiClient } from "@/lib/http-client";

export type ListMeterCustomersFilters = {
  meterId: string;
  search?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  pageSize: number;
  page: number;
}

export async function listMeterCustomers(filters: ListMeterCustomersFilters) : Promise<PaginatedResponse<CustomerMeter>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.createdAtStart && { createdAtStart: filters.createdAtStart }),
    ...(filters.createdAtEnd && { createdAtEnd: filters.createdAtEnd }),
    ...(filters.search && { search: filters.search }),
  };

  const response = await apiClient.get<PaginatedResponse<CustomerMeter>>(`/customer-meters/${filters.meterId}/customers`, {
    params,
  });
  return response.data;
}