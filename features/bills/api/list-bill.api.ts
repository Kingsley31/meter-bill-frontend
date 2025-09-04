import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Bill } from "../bill.types";



export type ListBillFilter = {
  generatedStartDate?: Date;
  generatedEndDate?: Date;
  requestId?: string | undefined;
  search?: string;
  isConsolidated?: boolean;
  areaId?: string;
  scope?: string;
  page?: number;
  pageSize: number;
};


export async function listBills(filters: ListBillFilter): Promise<PaginatedResponse<Bill>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.search && { search: filters.search }),
    ...(filters.areaId && { areaId: filters.areaId }),
    ...(filters.scope && { scope: filters.scope }),
    ...(filters.requestId && { requestId: filters.requestId }),
    ...((filters.isConsolidated != null || filters.isConsolidated != undefined) && { isConsolidated: filters.isConsolidated }),
    ...(filters.generatedStartDate && { generatedStartDate: filters.generatedStartDate }),
    ...(filters.generatedEndDate && { generatedEndDate: filters.generatedEndDate }),
  };

  const response = await apiClient.get<PaginatedResponse<Bill>>("/bills", {
    params,
  });
  return response.data;
}