import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { MeterConsumptionChartData } from "../meter.types";

export type MeterConsumptionChartFilter = {
    numberOfPastMonths?: number;
    meterId: string;
}

export async function getMeterConsumptionChartData(params: MeterConsumptionChartFilter): Promise<MeterConsumptionChartData[]> {
    const fullData: MeterConsumptionChartData[] = [
      { month: "Aug 2024", consumption: 100 },
      { month: "Sep 2024", consumption: 115 },
      { month: "Oct 2024", consumption: 130 },
      { month: "Nov 2024", consumption: 120 },
      { month: "Dec 2024", consumption: 140 },
      { month: "Jan 2025", consumption: 125 },
      { month: "Feb 2025", consumption: 110 },
      { month: "Mar 2025", consumption: 120 },
      { month: "Apr 2025", consumption: 135 },
      { month: "May 2025", consumption: 110 },
      { month: "Jun 2025", consumption: 145 },
      { month: "Jul 2025", consumption: 160 },
    ];
    // throw new Error('Netework Error');
    if (params.numberOfPastMonths) {
        const filterOptions: Record<string,MeterConsumptionChartData[]> = {
                "3": fullData.slice(-3),
                "5": fullData.slice(-5),
                "12": fullData, // past year
            }
        const data = filterOptions[params.numberOfPastMonths.toString()];
        return data;
    }
    return fullData;
}