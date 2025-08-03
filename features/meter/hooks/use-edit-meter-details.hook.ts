import { useMutation } from "@tanstack/react-query";
import { editMeter, EditMeterPayload } from "../api/edit-meter-details.api";


export function useEditMeter() {
  return useMutation<boolean, unknown, EditMeterPayload>({
    mutationFn: (payload) => editMeter(payload),
  });
}