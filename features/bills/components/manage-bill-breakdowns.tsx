"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { billBreakdownColumns } from "./bill-breakdown.colums";
import { Bill } from "../bill.types";
import { useListBillBreakdown } from "../hooks/use-list-bill-breakdown.hook";
import { DataTable } from "@/components/data-table"
import { useState } from "react";
import { ListBillBreakdownsFilters } from "../api/list-bill-breakdowns.api";



type ManageBillBreakdownProps = {
  bill: Bill;
  refetch?: () => void;
}

export function ManageBillBreakdowns({ bill }: ManageBillBreakdownProps) {
  const [filters, setFilter] = useState<ListBillBreakdownsFilters>({billId: bill.id, pageSize: 5, page: 1});


  const { data, isLoading, error, refetch } = useListBillBreakdown(filters);

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Breakdowns</CardTitle>
        <CardDescription>
            view breakdown items for this bill.<br/>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <DataTable
            columns={billBreakdownColumns}
            data={data?.data || []}
            emptyMessage="No bill breakdowns found."
            loading={isLoading}
            skeletonRows={5}
            pagination={{
              pageIndex: (filters.page ?? 1) - 1,
              pageSize: filters.pageSize,
              total: data?.total || 0,
            }}
            setPagination={(page:number,pageSize: number)=> setFilter((prev) => {return {...prev,page,pageSize}})}
            error={error}
            onRetry={refetch}
          />
        </div>
      </CardContent>
    </Card>
  )
}
