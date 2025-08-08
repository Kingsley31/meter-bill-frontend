import { useQuery } from "@tanstack/react-query";
import { getArea, GetAreaProps } from "../api/get-area.api";
import { Area } from "@/shared/area/types";

export function useGetArea(params: GetAreaProps) {
  return useQuery<Area>({
    queryKey: ["area", params],
    queryFn: () => getArea(params),
  });
}