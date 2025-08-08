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
import { getAreaLeaderColumns } from "./area-leader.colums"
import { ListAreaLeadersFilters } from "../api/list-area-leader.api"
import { useListAreaLeader } from "../hooks/use-list-area-leader.hook"
import { AssignAreaLeader } from "./assign-area-leader.form"


type ManageAreaLeaderProps = {
  area: Area;
  refetch: () => void;
}

export function ManageAreaLeaders({ area, refetch: refetchArea }: ManageAreaLeaderProps) {
  const [filters, setFilter] = useState<ListAreaLeadersFilters>({areaId: area.id, pageSize: 5, page: 1});


  const { data, isLoading, error, refetch } = useListAreaLeader(filters);


const refetchAll = () => {
  refetchArea()
  refetch()
}
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Leaders</CardTitle>
        <CardDescription>
            manage this area leaders for accurate notification of updates in the area.<br/>
            Area: <span className="font-medium">{area.areaName}</span><br/>
            Total Leaders: <span className="font-medium">{data?.total ?? 0}</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex w-full justify-end items-end">
          <AssignAreaLeader area={area} refetch={refetchAll}/>
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Assigned Leaders</p>
          <DataTable
            columns={getAreaLeaderColumns({refetch:refetchAll})}
            data={data?.data || []}
            emptyMessage="No leader assigned to this area yet."
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
