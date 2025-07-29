import { apiClient } from "@/lib/http-client";

export type SetMeterTariffProps = {
    meterId: string;
    tariff: number;
    effectiveFrom: string;
}
export async function setMeterTariff(payload: SetMeterTariffProps): Promise<boolean> {
    const response = await apiClient.patch(`/meters/${payload.meterId}/tariff`, {tariff: payload.tariff,effectiveFrom: payload.effectiveFrom});
    return response.data;
}