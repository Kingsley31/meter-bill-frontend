import { useMutation } from "@tanstack/react-query";
import { deleteMeterCustomer, DeleteMeterCustomerParams } from "../api/delete-meter-customer.api";

export function useDeleteMeterCustomer() {
  return useMutation<boolean, unknown, DeleteMeterCustomerParams>({
    mutationFn: (payload) => deleteMeterCustomer(payload),
  });
}