import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { BillGenerationRequest } from "../bill.types";



export type ListBillGenerationRequestFilter = {
  requestDateStart?: Date | undefined;
  requestDateEnd?: Date | undefined;
  xRequestId?: string | undefined;
  requestedByUserName?: string | undefined;
  requestedByUserId?: string | undefined;
  generationDateStart?: Date | undefined;
  generationDateEnd?: Date | undefined;
  page?: number;
  pageSize: number;
};


export async function listBillGenerationRequests(filters: ListBillGenerationRequestFilter): Promise<PaginatedResponse<BillGenerationRequest>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.requestDateStart && { requestDateStart: filters.requestDateStart }),
    ...(filters.requestDateEnd && { requestDateEnd: filters.requestDateEnd }),
    ...(filters.xRequestId && { xRequestId: filters.xRequestId }),
    ...(filters.requestedByUserName && { requestedByUserName: filters.requestedByUserName }),
    ...(filters.requestedByUserId && { requestedByUserId: filters.requestedByUserId }),
    ...(filters.generationDateStart && { generationDateStart: filters.generationDateStart }),
    ...(filters.generationDateEnd && { generationDateEnd: filters.generationDateEnd }),
  };

  const response = await apiClient.get<PaginatedResponse<BillGenerationRequest>>("/bills/generation-requests", {
    params,
  });
  return response.data;
}