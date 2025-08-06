import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Area } from "../types";

export type ListAreaFilters = {
  search?: string;
  page?: number;
  pageSize: number;
};

export async function listAreas(filters: ListAreaFilters): Promise<PaginatedResponse<Area>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
  };

  const response = await apiClient.get<PaginatedResponse<Area>>("/areas", {
    params,
  });
  return response.data;
}