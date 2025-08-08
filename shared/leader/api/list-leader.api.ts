// import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Leader } from "../types";
import { v4 as uuidv4 } from "uuid"

export type ListLeaderFilters = {
  search?: string;
  page?: number;
  pageSize: number;
};

export async function listLeaders(filters: ListLeaderFilters): Promise<PaginatedResponse<Leader>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
  };

    const mockLeaders: Leader[] = Array.from({ length: 50 }).map((_, i) => ({
      id: uuidv4(),
      name: `Leader ${i + 1}`,
      email: `lead${i + 1}@email.com`,
      address: `Block ${i + 1}, Utility Rd.`,
      phone: `+23480${i + 1}84${i + 1}832${i + 1}`
    }))

      const filteredLeaders = mockLeaders.filter((lead) =>
        `${lead.name} ${lead.email} ${lead.phone} ${lead.address}`
          .toLowerCase()
          .includes(params?.search?.toLowerCase() ?? "")
      )
    
      const paginatedLeaders = filteredLeaders.slice(
        (params.page - 1) * params.pageSize,
        params.page * params.pageSize
      )
    
      const hasNextPage = params.page * params.pageSize < filteredLeaders.length

  return {
      data: paginatedLeaders,
      page: params.page,
      pageSize: params.pageSize,
      hasMore: hasNextPage,
      total: filteredLeaders.length
  }

  // const response = await apiClient.get<PaginatedResponse<Leader>>("/leadomers", {
  //   params,
  // });
  // return response.data;
}