import { apiClient } from "@/lib/http-client";
import { Meter } from "@/shared/meter/types";

export type ListDerivedMeterSubMetersProps = {
    meterId: string;
}
export async function listDerivedMeterSubMeters({meterId}: ListDerivedMeterSubMetersProps): Promise<Meter[]>{
    const response = await apiClient.get<Meter[]>(`/meters/${meterId}/sub-meters`);
    console.log(response.data);
    return response.data;
}