import { useQuery } from "@tanstack/react-query";
import { listMeterCustomers, ListMeterCustomersFilters } from "../api/list-meter-customer.api";

export function useListMeterCustomer(filters: ListMeterCustomersFilters) {
  return useQuery({
    queryKey: ["list-meter-customers", filters],
    queryFn: () => listMeterCustomers(filters),
  });
}