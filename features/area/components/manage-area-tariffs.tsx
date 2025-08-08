"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

import { Area } from "@/shared/area/types"
import { DataTable } from "@/components/data-table"
import { useState } from "react"
import { SetAreaTariff } from "./set-area-tariff.form"
import { areaTariffColumns } from "./area-tariff.colums"
import { useListAreaTariff } from "../hooks/use-list-area-tariff.hook"
import { ListAreaTariffsFilters } from "../api/list-area-tariffs.api"



type ManageAreaTariffProps = {
  area: Area;
  refetch: () => void;
}

export function ManageAreaTariffs({ area, refetch: refetchArea }: ManageAreaTariffProps) {
  const [filters, setFilter] = useState<ListAreaTariffsFilters>({areaId: area.id, pageSize: 5, page: 1});


  const { data, isLoading, error, refetch } = useListAreaTariff(filters);


const refetchAll = () => {
  refetchArea()
  refetch()
}
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Tariffs</CardTitle>
        <CardDescription>
            manage this area&apos;s tariff for accurate billing.<br/>
            Area: <span className="font-medium">{area.areaName}</span><br/>
          {(area.currentTariff!=0 && area.currentTariff!=null && area.currentTariff!=undefined) && (
            <>
              Last Tariff: <span className="font-medium">{area.currentTariff} ₦/kwh</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex w-full justify-end items-end">
          <SetAreaTariff area={area} refetch={refetchAll}/>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Tariff History</p>
          <DataTable
            columns={areaTariffColumns}
            data={data?.data || []}
            emptyMessage="No area tariffs found."
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
