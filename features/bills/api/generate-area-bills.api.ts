import { apiClient } from "@/lib/http-client";
import { generateRequestId } from "@/lib/utils";
import { BillGenerationRequest } from "../bill.types";


export type GenerateAreaBillsPayload = {
  areaId: string;
  areaName: string;
  startDate: Date;
  endDate: Date;
}

export async function generateAreaBills(payload: GenerateAreaBillsPayload): Promise<BillGenerationRequest> {
  const xRequestId = generateRequestId();
  const response = await apiClient.post("/bills/area", {...payload, xRequestId});
  return response.data;
}