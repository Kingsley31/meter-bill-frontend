"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { ListReadExceptionMeterFilters } from "../api/list-read-exception-meter.api";
import { FilterMeter } from "./filter-meter";
import { useListConsumptionExceptionMeter } from "../hooks/use-list-consumption-exception-meter.hook";
import { getConsumptionExceptionMeterColumns } from "./consumption-exception-meter.colums";

export function ConsumptionExceptionMetersTable() {
  const searchParams = useSearchParams();
    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 5);
  
    const filters: ListReadExceptionMeterFilters = {
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

  const { data, isLoading, error, refetch } = useListConsumptionExceptionMeter(filters);

  return (
    <Card className="w-full max-w-screen mx-auto">
      <CardHeader>
        <CardTitle>Consumption Exception Meters</CardTitle>
        <CardDescription>
          List of meters with 20 percent consumption change.
        </CardDescription>
        <CardAction><FilterMeter /></CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={getConsumptionExceptionMeterColumns({refetch})}
          data={data?.data || []}
          emptyMessage="No meters with consumption exception found."
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
