import { useQuery } from "@tanstack/react-query";
import { Meter } from "@/shared/meter/types";
import { listDerivedMeterSubMeters, ListDerivedMeterSubMetersProps } from "../api/list-derived-meter-sub-meters.api";

export function useListDerivedMeterSubMeters(params: ListDerivedMeterSubMetersProps) {
  return useQuery<Meter[]>({
    queryKey: ["sub-meters", params],
    queryFn: () => listDerivedMeterSubMeters(params),
  });
}