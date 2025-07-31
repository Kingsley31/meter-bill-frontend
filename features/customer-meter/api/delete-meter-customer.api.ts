import { apiClient } from "@/lib/http-client";

export type DeleteMeterCustomerParams = {
  meterId: string;
  customerId: string;
};

export async function deleteMeterCustomer(params: DeleteMeterCustomerParams) {
    const reponse = await apiClient.delete(`/customer-meters/${params.meterId}/customers/${params.customerId}`);
    return reponse.data;
}