import { useQuery } from "@tanstack/react-query";
import { getMeter, GetMeterProps } from "../api/get-meter.api";
import { Meter } from "../meter.types";

export function useGetMeter(params: GetMeterProps) {
  return useQuery<Meter>({
    queryKey: ["meter", params],
    queryFn: () => getMeter(params),
  });
}