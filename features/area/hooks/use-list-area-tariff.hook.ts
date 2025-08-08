import { PaginatedResponse } from "@/types/paginated.respone.type";
import { AreaTariff } from "../area.types";
import { useQuery } from "@tanstack/react-query";
import { listAreaTariffs, ListAreaTariffsFilters } from "../api/list-area-tariffs.api";

export function useListAreaTariff(filters: ListAreaTariffsFilters) {
  return useQuery<PaginatedResponse<AreaTariff>>({
    queryKey: ["area-tariffs", filters],
    queryFn: () => listAreaTariffs(filters),
  });
}