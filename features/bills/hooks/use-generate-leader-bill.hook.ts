import { useMutation } from "@tanstack/react-query";
import { BillGenerationRequest } from "../bill.types";
import { generateLeadersBill, GenerateLeadersBillPayload } from "../api/generate-leaders-bill.api";


export function useGenerateLeadersBill() {
  return useMutation<BillGenerationRequest, unknown, GenerateLeadersBillPayload>({
    mutationFn: (payload) => generateLeadersBill(payload),
  });
}