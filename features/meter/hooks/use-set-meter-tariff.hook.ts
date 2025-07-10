import { useMutation } from "@tanstack/react-query";
import { setMeterTariff, SetMeterTariffProps } from "../api/set-meter-tariff.api";

export function useSetMeterTariff() {
  return useMutation<boolean, unknown, SetMeterTariffProps>({
    mutationFn: (payload) => setMeterTariff(payload),
  });
}