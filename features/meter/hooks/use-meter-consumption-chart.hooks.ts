import { useQuery } from "@tanstack/react-query";
import { getMeterConsumptionChartData, MeterConsumptionChartFilter } from "../api/meter-consumption-chart.api";
import { MeterConsumptionChartData } from "../meter.types";

export function useMeterConsumptionChartData(filters: MeterConsumptionChartFilter) {
  return useQuery<MeterConsumptionChartData[]>({
    queryKey: ["meter-consumption-cart", filters],
    queryFn: () => getMeterConsumptionChartData(filters),
  });
}