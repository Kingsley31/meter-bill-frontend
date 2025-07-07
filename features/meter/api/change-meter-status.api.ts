import { apiClient } from "@/lib/http-client";

export type ChangeMeterStatusProps = {
    meterId: string;
    isActive: boolean;
}
export async function changeMeterStatus(payload: ChangeMeterStatusProps): Promise<boolean> {
    const response = await apiClient.patch(`/meters/${payload.meterId}/status`, {isActive: payload.isActive});
    return response.data;
}