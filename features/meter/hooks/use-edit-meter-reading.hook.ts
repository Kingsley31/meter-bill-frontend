import { useMutation } from "@tanstack/react-query";
import { editMeterReading, EditMeterReadingPayload } from "../api/edit-meter-reading.api";


export function useEditMeterReading() {
  return useMutation<boolean, unknown, EditMeterReadingPayload>({
    mutationFn: (payload) => editMeterReading(payload),
  });
}