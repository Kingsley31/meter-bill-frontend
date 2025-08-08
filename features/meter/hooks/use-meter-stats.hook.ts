import { useQuery } from "@tanstack/react-query";
import { getMeterStats, MeterStatsFilter, MeterStatsResponse } from "../api/meter-stats.api";


export function useMeterStats(filters:MeterStatsFilter) {
  return useQuery<MeterStatsResponse>({
    queryKey: ["meter-stats", filters],
    queryFn: () => getMeterStats(filters),
  });
}