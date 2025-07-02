"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { columns } from "./meter.colums";
import { useListMeter } from "../hooks/use-list-meter.hook";
import type { ListMeterFilters } from "../api/list-meter.api";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { FilterMeter } from "./filter-meter";

export function AllMetersTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  const filters: ListMeterFilters = {
    page,
    pageSize,
  };

  searchParams.forEach((value, key) => {
    if (
      key === "search" ||
      key === "areaId" ||
      key === "type" ||
      key === "purpose" ||
      key === "meterNumber" ||
      key === "customerId" ||
      key === "customerName"
    ) {
      // Only assign known filter keys
      (filters as Record<string, unknown>)[key] = value;
    }
  });

  const { data, isLoading } = useListMeter(filters);

  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>All Meters</CardTitle>
        <CardDescription>
          View, filter, and manage all electric meters in the system.
        </CardDescription>
        <CardAction><FilterMeter /></CardAction>
      </CardHeader>
      <CardContent className="overflow-x-auto w-full">
        <DataTable
          columns={columns}
          data={data?.data || []}
          emptyMessage="No meters found."
          loading={isLoading}
          skeletonRows={5}
          pagination={{
            pageIndex: page - 1,
            pageSize,
            total: data?.total || 0,
          }}
        />
      </CardContent>
    </Card>
  );
}