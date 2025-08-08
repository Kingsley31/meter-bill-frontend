import { useMutation } from "@tanstack/react-query";
import { setAreaTariff, SetAreaTariffProps } from "../api/set-area-tariff.api";

export function useSetAreaTariff() {
  return useMutation<boolean, unknown, SetAreaTariffProps>({
    mutationFn: (payload) => setAreaTariff(payload),
  });
}