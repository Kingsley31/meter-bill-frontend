import { useMutation } from "@tanstack/react-query";
import { uploadMeterReading, UploadMeterReadingPayload } from "../api/upload-meter-reading.api";


export function useUploadMeterReading() {
  return useMutation<boolean, unknown, UploadMeterReadingPayload>({
    mutationFn: (payload) => uploadMeterReading(payload),
  });
}