import { useMutation } from "@tanstack/react-query";
import { BillGenerationRequest } from "../bill.types";
import { generateCustomerBill, GenerateCustomerBillPayload } from "../api/generate-customer-bill.api";


export function useGenerateCustomerBill() {
  return useMutation<BillGenerationRequest, unknown, GenerateCustomerBillPayload>({
    mutationFn: (payload) => generateCustomerBill(payload),
  });
}