import { apiClient } from "@/lib/http-client";

export type AssignMeterAreaApiProps = {
    meterId: string;
    areaId: string;
    areaName: string;
    location: string;
}

export async function assignMeterAreaApi(payload: AssignMeterAreaApiProps): Promise<boolean> {
    const response = await apiClient.patch(`/meters/${payload.meterId}/area`, {
        areaId: payload.areaId, 
        areaName: payload.areaName,
        location: payload.location
    });
    return response.data;
}