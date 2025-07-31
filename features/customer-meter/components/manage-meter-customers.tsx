"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Meter } from "@/shared/meter/types"
import { DataTable } from "@/components/data-table"
import { useState } from "react"
import { AssignMeterCustomer } from "./assign-meter-customer.form"
import { getMeterCustomerColumns } from "./meter-customer.colums"
import { ListMeterCustomersFilters } from "../api/list-meter-customer.api"
import { useListMeterCustomer } from "../hooks/use-list-meter-customer.hook"


type ManageMeterCustomerProps = {
  meter: Meter;
  refetch: () => void;
}

export function ManageMeterCustomer({ meter, refetch: refetchMeter }: ManageMeterCustomerProps) {
  const [filters, setFilter] = useState<ListMeterCustomersFilters>({meterId: meter.id, pageSize: 5, page: 1});


  const { data, isLoading, error, refetch } = useListMeterCustomer(filters);


const refetchAll = () => {
  refetchMeter()
  refetch()
}
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meter Customers</CardTitle>
        <CardDescription>
            manage this meter customers for accurate notification and billing.<br/>
            Meter: <span className="font-medium">{meter.meterNumber}</span><br/>
            Total Customers: <span className="font-medium">{meter.totalCustomers}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex w-full justify-end items-end">
          <AssignMeterCustomer meter={meter} refetch={refetchAll}/>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Assigned Customers</p>
          <DataTable
            columns={getMeterCustomerColumns({refetch:refetchAll})}
            data={data?.data || []}
            emptyMessage="No customer assigned to this meter yet."
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
