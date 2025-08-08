import { apiClient } from "@/lib/http-client";

export type SetAreaTariffProps = {
    areaId: string;
    tariff: number;
    effectiveFrom: string;
}
export async function setAreaTariff(payload: SetAreaTariffProps): Promise<boolean> {
    const response = await apiClient.patch(`/areas/${payload.areaId}/tariff`, {tariff: payload.tariff,effectiveFrom: payload.effectiveFrom});
    return response.data;
}