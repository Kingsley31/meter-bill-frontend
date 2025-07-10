import { apiClient } from "@/lib/http-client";
import { Meter } from "@/shared/meter/types";

export type GetMeterProps = {
    meterId: string;
}
export async function getMeter({meterId}: GetMeterProps): Promise<Meter>{
    const response = await apiClient.get<Meter>(`/meters/${meterId}`);
    console.log(response.data);
    return response.data;
}