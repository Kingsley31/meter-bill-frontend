import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Bill } from "../bill.types";
import { ListBillFilter, listBills } from "../api/list-bill.api";


export function useListBill(filters: ListBillFilter) {
  return useQuery<PaginatedResponse<Bill>>({
    queryKey: ["bills", filters],
    queryFn: () => listBills(filters),
  });
}