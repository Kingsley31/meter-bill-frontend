import { useMutation } from "@tanstack/react-query";
import { assignMeterCustomer, AssignMeterCustomerProps } from "../api/assign-meter-customer.api";

export function useAssignMeterCustomer() {
  return useMutation<boolean, unknown, AssignMeterCustomerProps>({
    mutationFn: (payload) => assignMeterCustomer(payload),
  });
}