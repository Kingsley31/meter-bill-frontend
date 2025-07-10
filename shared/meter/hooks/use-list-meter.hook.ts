import { useQuery } from "@tanstack/react-query";
import { listMeters, ListMeterFilters } from "../api/list-meter.api";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Meter } from "../types";

export function useListMeter(filters: ListMeterFilters) {
  return useQuery<PaginatedResponse<Meter>>({
    queryKey: ["meters", filters],
    queryFn: () => listMeters(filters),
  });
}