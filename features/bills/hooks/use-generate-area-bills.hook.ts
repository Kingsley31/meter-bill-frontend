import { useMutation } from "@tanstack/react-query";
import { BillGenerationRequest } from "../bill.types";
import { generateAreaBills, GenerateAreaBillsPayload } from "../api/generate-area-bills.api";


export function useGenerateAreaBills() {
  return useMutation<BillGenerationRequest, unknown, GenerateAreaBillsPayload>({
    mutationFn: (payload) => generateAreaBills(payload),
  });
}