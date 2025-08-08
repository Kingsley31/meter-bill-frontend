import { apiClient } from "@/lib/http-client";
import { Area } from "@/shared/area/types";

export type GetAreaProps = {
    areaId: string;
}
export async function getArea({areaId}: GetAreaProps): Promise<Area>{
    const response = await apiClient.get<Area>(`/areas/${areaId}`);
    console.log(response.data);
    return response.data;
}