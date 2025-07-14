import { PaginatedResponse } from "@/types/paginated.respone.type";
import { listMeterReadings, ListMeterReadingsFilters } from "../api/list-meter-readings.api";
import { MeterReading } from "../meter.types";
import { useQuery } from "@tanstack/react-query";

export function useListMeterReading(filters: ListMeterReadingsFilters) {
  return useQuery<PaginatedResponse<MeterReading>>({
    queryKey: ["meter-readings", filters],
    queryFn: () => listMeterReadings(filters),
  });
}