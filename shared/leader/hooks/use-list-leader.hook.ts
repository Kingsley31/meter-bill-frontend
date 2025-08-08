import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { Leader } from "../types";
import { ListLeaderFilters, listLeaders } from "../api/list-leader.api";


export function useListLeader(filters: ListLeaderFilters) {
  return useQuery<PaginatedResponse<Leader>>({
    queryKey: ["leader", filters],
    queryFn: () => listLeaders(filters),
  });
}