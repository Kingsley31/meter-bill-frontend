import { apiClient } from "@/lib/http-client";
import { generateRequestId } from "@/lib/utils";
import { BillGenerationRequest } from "../bill.types";


export type GenerateCustomerBillPayload = {
  recipientId: string;
  startDate: Date;
  endDate: Date;
}

export async function generateCustomerBill(payload: GenerateCustomerBillPayload): Promise<BillGenerationRequest> {
  const xRequestId = generateRequestId();
  const response = await apiClient.post("/bills/customer-consolidated", {...payload, xRequestId});
  return response.data;
}