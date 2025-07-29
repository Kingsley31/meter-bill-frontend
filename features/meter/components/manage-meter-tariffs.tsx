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
import { meterTariffColumns } from "./meter-tariff.colums"
import { SetMeterTariff } from "./set-meter-tariff.form"
import { ListMeterTariffsFilters } from "../api/list-meter-tariffs.api"
import { useListMeterTariff } from "../hooks/use-list-meter-tariff.hook"


type ManageMeterTariffProps = {
  meter: Meter;
  refetch: () => void;
}

export function ManageMeterTariff({ meter, refetch: refetchMeter }: ManageMeterTariffProps) {
  const [filters, setFilter] = useState<ListMeterTariffsFilters>({meterId: meter.id, pageSize: 5, page: 1});


  const { data, isLoading, error, refetch } = useListMeterTariff(filters);


const refetchAll = () => {
  refetchMeter()
  refetch()
}
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meter Tariffs</CardTitle>
        <CardDescription>
            manage this meter&apos;s tariff for accurate billing.<br/>
            Meter: <span className="font-medium">{meter.meterNumber}</span><br/>
          {meter.tariff && (
            <>
              Last Tariff: <span className="font-medium">{meter.tariff} ₦/kwh</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex w-full justify-end items-end">
          <SetMeterTariff meter={meter} refetch={refetchAll}/>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Tariff History</p>
          <DataTable
            columns={meterTariffColumns}
            data={data?.data || []}
            emptyMessage="No meter tariffs found."
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
