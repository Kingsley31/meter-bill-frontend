import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { ListAreaFilters, listAreas } from "../api/list-area.api";
import { Area } from "../types";


export function useListArea(filters: ListAreaFilters) {
  return useQuery<PaginatedResponse<Area>>({
    queryKey: ["areas", filters],
    queryFn: () => listAreas(filters),
  });
}