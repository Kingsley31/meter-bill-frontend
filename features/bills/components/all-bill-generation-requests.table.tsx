"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { ListBillGenerationRequestFilter } from "../api/list-bill-generation-request.api";
import { useListBillGenerationRequests } from "../hooks/use-list-bill-generation-request.hook";
import { billGenerationRequestColumns } from "./bill-generation-request.colums";
import { FilterBillGenerationRequests } from "./filter-bill-generaion-requests";


export function AllBillGenerationRequestsTable() {
  const searchParams = useSearchParams();
      const page = Number(searchParams.get("page") || 1);
      const pageSize = Number(searchParams.get("pageSize") || 5);
    
      const filters: ListBillGenerationRequestFilter = {
        page,
        pageSize,
      };
    
      searchParams.forEach((value, key) => {
        if (
            key === "search" ||
            key === "requestedByUserName" ||
            key === "xRequestId" ||
            key === "generationDateStart" ||
            key === "generationDateEnd"
        ) {
            (filters as Record<string, unknown>)[key] = value;
        }
      });
    
      const { data, isLoading, error, refetch } = useListBillGenerationRequests(filters);

  return (
    <Card className="w-full max-w-screen mx-auto">
      <CardHeader>
        <CardTitle>Bills Generation Status</CardTitle>
        <CardDescription>
          View, filter, and manage status of all bill generation requests in the system.
        </CardDescription>
        <CardAction><FilterBillGenerationRequests /></CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={billGenerationRequestColumns}
          data={data?.data || []}
          emptyMessage="No bill generation requests found."
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