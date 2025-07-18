"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { getAllMeterColumns } from "./meter.colums";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { FilterMeter } from "./filter-meter";
import { ListMeterFilters } from "@/shared/meter/api/list-meter.api";
import { useListMeter } from "@/shared/meter/hooks/use-list-meter.hook";

export function AllMetersTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 5);

  const filters: ListMeterFilters = {
    page,
    pageSize,
  };

  searchParams.forEach((value, key) => {
    if (
      key === "search" ||
      key === "areaId" ||
      key === "type" ||
      key === "purpose"
    ) {
      (filters as Record<string, unknown>)[key] = value;
    }
  });

  const { data, isLoading, error, refetch } = useListMeter(filters);

  return (
    <Card className="w-full max-w-screen mx-auto">
      <CardHeader>
        <CardTitle>All Meters</CardTitle>
        <CardDescription>
          View, filter, and manage all electric meters in the system.
        </CardDescription>
        <CardAction><FilterMeter /></CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={getAllMeterColumns({refetch})}
          data={data?.data || []}
          emptyMessage="No meters found."
          loading={isLoading}
          skeletonRows={5}
          pagination={{
            pageIndex: page - 1,
            pageSize,
            total: data?.total || 0,
          }}
          error={error}
          onRetry={refetch}
        />
      </CardContent>
    </Card>
  );
}