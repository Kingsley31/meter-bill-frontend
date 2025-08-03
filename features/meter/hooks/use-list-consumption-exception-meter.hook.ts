import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { ListConsumptionExceptionMeterFilters, listConsumptionExceptionMeters } from "../api/list-consumption-exception-meter.api";
import { MeterWithConsumptionChangePercent } from "../meter.types";

export function useListConsumptionExceptionMeter(filters: ListConsumptionExceptionMeterFilters) {
  return useQuery<PaginatedResponse<MeterWithConsumptionChangePercent>>({
    queryKey: ["consumption-exception-meters", filters],
    queryFn: () => listConsumptionExceptionMeters(filters),
  });
}