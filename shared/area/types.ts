

export type Area = {
    id: string;
    areaName: string;
    city: string;
    state: string;
    country: string;
    address: string;
    totalMeters: number;
    type?: string | null;
    currentTariff?: number | null;
    totalKwhReading?: number | null;
    totalKwhConsumption?: number | null;
    lastBillKwhConsumption?: number | null;
    lastBillDate?: string | null;
    lastBillAmount?: number | null;
    createdAt: string;
    updatedAt: string;
}