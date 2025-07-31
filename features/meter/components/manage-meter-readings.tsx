"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Meter } from "@/shared/meter/types"


import { CreateMeterReadingForm, MeterReadingFormTriggerType } from "./meter-reading.form"
import { DataTable } from "@/components/data-table"
import { ListMeterReadingsFilters } from "../api/list-meter-readings.api"
import { useState } from "react"
import { useListMeterReading } from "../hooks/use-list-meter-reading.hook"
import { getMeterReadingColumns } from "./meter-reading.colums"


type ManageMeterReadingsProps = {
  meter: Meter;
  refetch: () => void;
}

export function ManageMeterReadings({ meter, refetch: refetchMeter }: ManageMeterReadingsProps) {
  const [filters, setFilter] = useState<ListMeterReadingsFilters>({meterId: meter.id, pageSize: 5, page: 1});


  const { data, isLoading, error, refetch } = useListMeterReading(filters);


const refetchAll = () => {
  refetchMeter()
  refetch()
}
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meter Readings</CardTitle>
        <CardDescription>
          {meter.currentKwhReading ? (
            <>
              Last Reading: <span className="font-medium">{meter.currentKwhReading} kWh</span> on {" "}
              <span className="text-muted-foreground">
                {meter.currentKwhReadingDate ? new Date(meter.currentKwhReadingDate).toLocaleDateString():"N/A"}
              </span>
            </>
          ) : (
            "manage this meter readings for accurate billing and verification."
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex w-full justify-end items-end">
          <CreateMeterReadingForm triggerType={MeterReadingFormTriggerType.BUTTON} meter={meter} refetch={refetchAll}/>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Reading History</p>
          <DataTable
            columns={getMeterReadingColumns({ refetch: refetchAll })}
            data={data?.data || []}
            emptyMessage="No meter readings found."
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
