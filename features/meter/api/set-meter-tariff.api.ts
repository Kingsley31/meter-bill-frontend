import { apiClient } from "@/lib/http-client";

export type SetMeterTariffProps = {
    meterId: string;
    meterNumber: string;
    areaId: string;
    tariff: number;
    effectiveFrom: string;
}
export async function setMeterTariff(payload: SetMeterTariffProps): Promise<boolean> {
    const response = await apiClient.post(`/tariffs/meter-tariffs`, payload);
    return response.data;
}