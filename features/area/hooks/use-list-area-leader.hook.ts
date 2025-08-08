import { useQuery } from "@tanstack/react-query";
import { listAreaLeaders, ListAreaLeadersFilters } from "../api/list-area-leader.api";

export function useListAreaLeader(filters: ListAreaLeadersFilters) {
  return useQuery({
    queryKey: ["list-area-leaders", filters],
    queryFn: () => listAreaLeaders(filters),
  });
}