import { Area } from "@/shared/area/types";

export type AreaTariff = {
  id: string;
  areaId: string;
  tariff: number;
  effectiveFrom: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string
}

export type AreaLeader = {
  id: string;
  areaId: string;
  leaderId: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  area: Area;
  areaName: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt?: string; // ISO date string or undefined
};