
import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { BillGenerationRequest } from "../bill.types";
import { ListBillGenerationRequestFilter, listBillGenerationRequests } from "../api/list-bill-generation-request.api";


export function useListBillGenerationRequests(filters: ListBillGenerationRequestFilter) {
  return useQuery<PaginatedResponse<BillGenerationRequest>>({
    queryKey: ["bill-generation-request", filters],
    queryFn: () => listBillGenerationRequests(filters),
  });
}