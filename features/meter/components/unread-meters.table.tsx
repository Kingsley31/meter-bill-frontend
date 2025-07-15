"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { unreadMeterColumns } from "./unread-meter.colums";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { FilterUnreadMeter } from "./filter-unread-meter";
import { ListUnreadMeterFilters } from "../api/list-unread-meter.api";
import { subDays, format } from "date-fns";
import { useListUnreadMeter } from "../hooks/use-list-unread-meter";

export function UnreadMetersTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 5);

  // Calculate default dates
  const today = new Date();
  const defaultEndDate = format(today, "yyyy-MM-dd");
  const defaultStartDate = format(subDays(today, 7), "yyyy-MM-dd");

  const startDateParam = searchParams.get("startDate")?.trim() || defaultStartDate;
  const endDateParam = searchParams.get("endDate")?.trim() || defaultEndDate;

  const filters: ListUnreadMeterFilters = {
    page,
    pageSize,
    startDate: startDateParam,
    endDate: endDateParam,
  };

  searchParams.forEach((value, key) => {
    if (
      key === "search" ||
      key === "areaId" ||
      key === "type" ||
      key === "purpose" ||
      key === "startDate" ||
      key === "endDate"
    ) {
      (filters as Record<string, unknown>)[key] = value;
    }
  });

  const { data, isLoading, error, refetch } = useListUnreadMeter(filters);

  return (
    <Card className="w-full max-w-screen mx-auto">
      <CardHeader>
        <CardTitle>Unread Meters</CardTitle>
        <CardDescription>
          View, filter, and manage all unread electric meters in the system.
        </CardDescription>
        <CardAction><FilterUnreadMeter defaultStartDate={defaultStartDate} defaultEndDate={defaultEndDate}/></CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={unreadMeterColumns}
          data={data?.data || []}
          emptyMessage="No unread meters found."
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
