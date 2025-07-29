import { PaginatedResponse } from "@/types/paginated.respone.type";
import { MeterTariff } from "../meter.types";
import { useQuery } from "@tanstack/react-query";
import { listMeterTariffs, ListMeterTariffsFilters } from "../api/list-meter-tariffs.api";

export function useListMeterTariff(filters: ListMeterTariffsFilters) {
  return useQuery<PaginatedResponse<MeterTariff>>({
    queryKey: ["meter-tariffs", filters],
    queryFn: () => listMeterTariffs(filters),
  });
}