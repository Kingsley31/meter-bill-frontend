import { useMutation } from "@tanstack/react-query";
import { changeMeterStatus, ChangeMeterStatusProps } from "../api/change-meter-status.api";

export function useChangeMeterStatus() {
  return useMutation<boolean, unknown, ChangeMeterStatusProps>({
    mutationFn: (payload) => changeMeterStatus(payload),
  });
}