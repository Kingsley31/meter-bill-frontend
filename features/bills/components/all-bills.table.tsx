"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { ListBillFilter } from "../api/list-bill.api";
import { useListBill } from "../hooks/use-list-bill.hook";
import { FilterBill } from "./filter-bill";
import { getAllBillColumns } from "./bill.colums";


export function AllBillsTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 5);

  const filters: ListBillFilter = {
    page,
    pageSize,
  };

  searchParams.forEach((value, key) => {
    if (
        key === "search" ||
        key === "areaId" ||
        key === "requestId" ||
        key === "purpose" ||
        key === "generatedStartDate" ||
        key === "generatedEndDate" ||
        key === "isConsolidated" ||
        key === "scope"
    ) {
        (filters as Record<string, unknown>)[key] = value;
    }
  });

  const { data, isLoading, error, refetch } = useListBill(filters);

  return (
    <Card className="w-full max-w-screen mx-auto">
      <CardHeader>
        <CardTitle>Manage Bills</CardTitle>
        <CardDescription>
          View, filter, and manage all bills in the system.
        </CardDescription>
        <CardAction><FilterBill /></CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={getAllBillColumns({refetch})}
          data={data?.data || []}
          emptyMessage="No bills found."
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