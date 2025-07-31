import { apiClient } from "@/lib/http-client";

export type AssignMeterCustomerProps = {
    meterId: string;
    customerId: string;
    custmerName: string;
    customerEmail: string;
    customerPhone?: string;
    meterNumber: string;
}
export async function assignMeterCustomer(payload: AssignMeterCustomerProps): Promise<boolean> {
    console.log("Assigning meter to customer", payload);
    const response = await apiClient.post(`/customer-meters/assign`, {
        customerId: payload.customerId,
        customerName: payload.custmerName,
        customerEmail: payload.customerEmail,
        meterId: payload.meterId,
        meterNumber: payload.meterNumber,
        customerPhone: payload.customerPhone,
    });
    return response.data;
}