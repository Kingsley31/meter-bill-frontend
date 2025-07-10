import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { ListUnreadMeterFilters, listUnreadMeters } from "../api/list-unread-meter.api";
import { Meter } from "@/shared/meter/types";

export function useListUnreadMeter(filters: ListUnreadMeterFilters) {
  return useQuery<PaginatedResponse<Meter>>({
    queryKey: ["unread-meters", filters],
    queryFn: () => listUnreadMeters(filters),
  });
}