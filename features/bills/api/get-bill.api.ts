import { apiClient } from "@/lib/http-client";
import { Bill } from "../bill.types";

export type GetBillProps = {
    billId: string;
}
export async function getBill({billId}: GetBillProps): Promise<Bill>{
    const response = await apiClient.get<Bill>(`/bills/${billId}`);
    console.log(response.data);
    return response.data;
}