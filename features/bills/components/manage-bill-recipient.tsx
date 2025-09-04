"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { DataTable } from "@/components/data-table";
import { billRecipientColumns } from "./bill-recipient.colums";
import { Bill } from "../bill.types";
import { useState } from "react";



type ManageBillRecipientProps = {
  bill: Bill;
}

export function ManageBillRecipients({ bill }: ManageBillRecipientProps) {
const [filters, setFilter] = useState<{billId: string;pageSize: number;page: number;}>({billId: bill.id, pageSize: 12, page: 1});


//   const { data, isLoading, error, refetch } = useListBillRecipient(filters);


// const refetchAll = () => {
//   refetchBill()
//   refetch()
// }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Recipients</CardTitle>
        <CardDescription>
            view list of recipients who should recieve this bill.<br/>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <DataTable
            columns={billRecipientColumns}
            data={bill.billRecipients || []}
            emptyMessage="No bill recipients found."
            loading={false}
            skeletonRows={5}
            pagination={{
              pageIndex: (filters.page ?? 1) - 1,
              pageSize: filters.pageSize,
              total: bill.billRecipients?.length || 0,
            }}
            setPagination={(page:number,pageSize: number)=> setFilter((prev) => {return {...prev,page,pageSize}})}
            onRetry={() => {}}
          />
        </div>
      </CardContent>
    </Card>
  )
}
