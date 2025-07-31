import { useMutation } from "@tanstack/react-query";
import { deleteMeterReading, DeleteMeterReadingParams } from "../api/delete-meter-reading.api";

export function useDeleteMeterReading() {
  return useMutation<boolean, unknown, DeleteMeterReadingParams>({
    mutationFn: (payload) => deleteMeterReading(payload),
  });
}