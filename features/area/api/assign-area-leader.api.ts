import { apiClient } from "@/lib/http-client";

export type AssignAreaLeaderProps = {
    areaId: string;
    leaderId: string;
    leaderName: string;
    leaderEmail: string;
    leaderPhone?: string;
    areaName: string;
}
export async function assignAreaLeader(payload: AssignAreaLeaderProps): Promise<boolean> {
    console.log("Assigning area to leader", payload);
    const response = await apiClient.post(`/areas/${payload.areaId}/leaders`, {
        leaderId: payload.leaderId,
        leaderName: payload.leaderName,
        leaderEmail: payload.leaderEmail,
        areaId: payload.areaId,
        areaName: payload.areaName,
        leaderPhone: payload.leaderPhone,
    });
    return response.data;
}