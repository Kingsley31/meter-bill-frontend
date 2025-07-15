import { apiClient } from "@/lib/http-client";
import { MeterConsumptionChartData } from "../meter.types";

export type MeterConsumptionChartFilter = {
    numberOfPastMonths: number;
    meterId: string;
}

export async function getMeterConsumptionChartData(data: MeterConsumptionChartFilter): Promise<MeterConsumptionChartData[]> {
    const params = {
        numberOfPastMonths: data.numberOfPastMonths,
    }
    const response = await apiClient.get<MeterConsumptionChartData[]>(`/meters/${data.meterId}/consumption-chart`,{params,});
        console.log(response.data);
    return response.data;
}