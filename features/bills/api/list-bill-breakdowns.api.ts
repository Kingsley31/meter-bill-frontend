import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { BillBreakdown } from "../bill.types";


export type ListBillBreakdownsFilters = {
  page?: number;
  pageSize: number;
  billId: string;
};

export async function listBreakdowns(filters: ListBillBreakdownsFilters): Promise<PaginatedResponse<BillBreakdown>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
  };

  const response = await apiClient.get<PaginatedResponse<BillBreakdown>>(`/bills/${filters.billId}/breakdowns`, {
    params,
  });
  return response.data;
}