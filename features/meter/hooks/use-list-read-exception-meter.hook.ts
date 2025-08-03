import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { ListReadExceptionMeterFilters, listReadExceptionMeters } from "../api/list-read-exception-meter.api";
import { Meter } from "@/shared/meter/types";

export function useListReadExceptionMeter(filters: ListReadExceptionMeterFilters) {
  return useQuery<PaginatedResponse<Meter>>({
    queryKey: ["read-exception-meters", filters],
    queryFn: () => listReadExceptionMeters(filters),
  });
}