import { useQuery } from "@tanstack/react-query";
import { getBillStats, BillStatsFilter, BillStatsResponse } from "../api/bill-stats.api";


export function useBillStats(filters:BillStatsFilter) {
  return useQuery<BillStatsResponse>({
    queryKey: ["bill-stats", filters],
    queryFn: () => getBillStats(filters),
  });
}