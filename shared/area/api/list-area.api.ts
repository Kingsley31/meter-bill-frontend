// import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Area } from "../types";

export type ListAreaFilters = {
  search?: string;
  stateId?: string;
  cityId?: string;
  page?: number;
  pageSize: number;
};

export async function listAreas(filters: ListAreaFilters): Promise<PaginatedResponse<Area>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
    ...(filters.stateId && { stateId: filters.stateId }),
    ...(filters.cityId && { cityId: filters.cityId }),
  };

  const areaOptions: Area[] = [
        { id: "d7a9e2e1-8c2d-4e3a-9c2d-1e2a3b4c5d6f", name: "Lagos Mainland", city: "Lagos", state: "Lagos", country: "Nigeria" },
        { id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", name: "Ikeja", city: "Lagos", state: "Lagos", country: "Nigeria" },
        { id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", name: "Ikorodu", city: "Lagos", state: "Lagos", country: "Nigeria" },
    ];
    const filteredAreas = areaOptions.filter(area =>
        area.name.toLowerCase().includes(params?.search?.toLowerCase() ?? "")
    );

  return {
      data: filteredAreas,
      page: params.page,
      pageSize: params.pageSize,
      hasMore: filteredAreas.length > params.pageSize,
      total: filteredAreas.length
  }

  // const response = await apiClient.get<PaginatedResponse<Area>>("/areas", {
  //   params,
  // });
  // return response.data;
}