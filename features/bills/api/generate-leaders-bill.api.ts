import { apiClient } from "@/lib/http-client";
import { generateRequestId } from "@/lib/utils";
import { BillGenerationRequest } from "../bill.types";


export type GenerateLeadersBillPayload = {
  areaId: string;
  areaName: string;
  startDate: Date;
  endDate: Date;
}

export async function generateLeadersBill(payload: GenerateLeadersBillPayload): Promise<BillGenerationRequest> {
  const xRequestId = generateRequestId();
  const response = await apiClient.post("/bills/area-consolidated", {...payload, xRequestId});
  return response.data;
}