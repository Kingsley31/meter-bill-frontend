import { useQuery } from "@tanstack/react-query";
import { getMeterStats, MeterStatsResponse } from "../api/meter-stats.api";


export function useMeterStats() {
  // This hook is intended to fetch and return meter statistics.
  // Currently, it does not implement any logic.
  // You can implement the logic to fetch meter statistics here.
  
  return useQuery<MeterStatsResponse>({
    queryKey: ["meter-stats"],
    queryFn: getMeterStats,
  });
}