import { apiClient } from "@/lib/http-client";

export type SetAreaTariffProps = {
    areaId: string;
    areaName: string;
    tariff: number;
    effectiveFrom: string;
}
export async function setAreaTariff(payload: SetAreaTariffProps): Promise<boolean> {
    const response = await apiClient.post(`/tariffs/area-tariffs`, payload);
    return response.data;
}