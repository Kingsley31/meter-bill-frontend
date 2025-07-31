// import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Customer } from "../types";
import { v4 as uuidv4 } from "uuid"

export type ListCustomerFilters = {
  search?: string;
  page?: number;
  pageSize: number;
};

export async function listCustomers(filters: ListCustomerFilters): Promise<PaginatedResponse<Customer>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
  };

    const mockCustomers: Customer[] = Array.from({ length: 50 }).map((_, i) => ({
      id: uuidv4(),
      name: `Customer ${i + 1}`,
      email: `cust${i + 1}@email.com`,
      address: `Block ${i + 1}, Utility Rd.`,
      phone: `+23480${i + 1}84${i + 1}832${i + 1}`
    }))

      const filteredCustomers = mockCustomers.filter((cust) =>
        `${cust.name} ${cust.email} ${cust.phone} ${cust.address}`
          .toLowerCase()
          .includes(params?.search?.toLowerCase() ?? "")
      )
    
      const paginatedCustomers = filteredCustomers.slice(
        (params.page - 1) * params.pageSize,
        params.page * params.pageSize
      )
    
      const hasNextPage = params.page * params.pageSize < filteredCustomers.length

  return {
      data: paginatedCustomers,
      page: params.page,
      pageSize: params.pageSize,
      hasMore: hasNextPage,
      total: filteredCustomers.length
  }

  // const response = await apiClient.get<PaginatedResponse<Customer>>("/customers", {
  //   params,
  // });
  // return response.data;
}