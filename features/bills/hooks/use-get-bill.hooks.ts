import { useQuery } from "@tanstack/react-query";
import { getBill, GetBillProps } from "../api/get-bill.api";
import { Bill } from "../bill.types";

export function useGetBill(params: GetBillProps) {
  return useQuery<Bill>({
    queryKey: ["bill", params],
    queryFn: () => getBill(params),
  });
}