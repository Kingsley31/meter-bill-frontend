import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { ListCustomerFilters, listCustomers } from "../api/list-customer.api";
import { Customer } from "../types";


export function useListCustomer(filters: ListCustomerFilters) {
  return useQuery<PaginatedResponse<Customer>>({
    queryKey: ["customers", filters],
    queryFn: () => listCustomers(filters),
  });
}