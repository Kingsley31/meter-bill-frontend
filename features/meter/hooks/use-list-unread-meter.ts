import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Meter } from "../meter.types";
import { ListUnreadMeterFilters, listUnreadMeters } from "../api/list-unread-meter.api";

export function useListUnreadMeter(filters: ListUnreadMeterFilters) {
  return useQuery<PaginatedResponse<Meter>>({
    queryKey: ["unread-meters", filters],
    queryFn: () => listUnreadMeters(filters),
  });
}