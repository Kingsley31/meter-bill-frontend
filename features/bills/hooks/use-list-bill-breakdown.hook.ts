import { PaginatedResponse } from "@/types/paginated.respone.type";
import { useQuery } from "@tanstack/react-query";
import { listBreakdowns, ListBillBreakdownsFilters } from "../api/list-bill-breakdowns.api";
import { BillBreakdown } from "../bill.types";

export function useListBillBreakdown(filters: ListBillBreakdownsFilters) {
  return useQuery<PaginatedResponse<BillBreakdown>>({
    queryKey: ["bill-breakdowns", filters],
    queryFn: () => listBreakdowns(filters),
  });
}