import { useQuery } from "@tanstack/react-query";
import { AreaStatsResponse, getAreaStats } from "../api/area-stats.api";


export function useAreaStats() {
  // This hook is intended to fetch and return meter statistics.
  // Currently, it does not implement any logic.
  // You can implement the logic to fetch meter statistics here.
  
  return useQuery<AreaStatsResponse>({
    queryKey: ["area-stats"],
    queryFn: getAreaStats,
  });
}