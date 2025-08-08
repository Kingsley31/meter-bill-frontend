import { PaginatedResponse } from "@/types/paginated.respone.type";
import { apiClient } from "@/lib/http-client";
import { AreaLeader } from "../area.types";

export type ListAreaLeadersFilters = {
  areaId: string;
  search?: string;
  createdAtStart?: Date;
  createdAtEnd?: Date;
  pageSize: number;
  page: number;
}

export async function listAreaLeaders(filters: ListAreaLeadersFilters) : Promise<PaginatedResponse<AreaLeader>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.createdAtStart && { createdAtStart: filters.createdAtStart }),
    ...(filters.createdAtEnd && { createdAtEnd: filters.createdAtEnd }),
    ...(filters.search && { search: filters.search }),
  };

  const response = await apiClient.get<PaginatedResponse<AreaLeader>>(`/areas/${filters.areaId}/leaders`, {
    params,
  });
  return response.data;
}