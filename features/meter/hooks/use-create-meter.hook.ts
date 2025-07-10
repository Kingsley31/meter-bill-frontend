import { useMutation } from "@tanstack/react-query";
import { createMeter, CreateMeterPayload } from "../api/create-meter.api";
import { Meter } from "@/shared/meter/types";


export function useCreateMeter() {
  return useMutation<Meter, unknown, CreateMeterPayload>({
    mutationFn: (payload) => createMeter(payload),
  });
}