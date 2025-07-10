import { apiClient } from "@/lib/http-client";

export type AssignMeterCustomerProps = {
    meterId: string;
    customerId: string;
    custmerName: string;
}
export async function assignMeterCustomer(payload: AssignMeterCustomerProps): Promise<boolean> {
    const response = await apiClient.patch(`/meters/${payload.meterId}/customer`, {
        customerId: payload.customerId,
        customerName: payload.custmerName
    });
    return response.data;
}