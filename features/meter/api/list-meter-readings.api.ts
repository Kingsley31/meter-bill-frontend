import { apiClient } from "@/lib/http-client";
import { PaginatedResponse } from "@/types/paginated.respone.type";
import { MeterReading } from "../meter.types";


export type ListMeterReadingsFilters = {
  startReadingDate?: string;
  endReadingDate?: string;
  startCreatedAt?: string;
  endCreatedAt?: string;
  page?: number;
  pageSize: number;
  meterId: string;
};

export async function listMeterReadings(filters: ListMeterReadingsFilters): Promise<PaginatedResponse<MeterReading>> {
  const params = {
    page: filters.page ?? 1,
    pageSize: filters.pageSize,
    ...(filters.startReadingDate && { startReadingDate: filters.startReadingDate }),
    ...(filters.endReadingDate && { endReadingDate: filters.endReadingDate }),
    ...(filters.startCreatedAt && { startCreatedAt: filters.startCreatedAt }),
    ...(filters.endCreatedAt && { endCreatedAt: filters.endCreatedAt }),
  };

  const response = await apiClient.get<PaginatedResponse<MeterReading>>(`/meters/${filters.meterId}/readings`, {
    params,
  });
  return response.data;
}