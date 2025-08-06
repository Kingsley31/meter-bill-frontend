import { useMutation } from "@tanstack/react-query";
import { Area } from "@/shared/area/types";
import { createArea, CreateAreaPayload } from "../api/create-area.api";


export function useCreateArea() {
  return useMutation<Area, unknown, CreateAreaPayload>({
    mutationFn: (payload) => createArea(payload),
  });
}