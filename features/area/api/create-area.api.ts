import { apiClient } from "@/lib/http-client";
import { Area } from "@/shared/area/types";


export type CreateAreaPayload = {
  areaName: string;
  country: string;
  state: string;
  city: string;
  address: string;
};

export async function createArea(payload: CreateAreaPayload): Promise<Area> {
  const response = await apiClient.post("/areas", payload);
  return response.data;
}