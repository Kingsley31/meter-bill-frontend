import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Meter } from "@/shared/meter/types"
import { useState } from "react";
import { ListMeterReadingsFilters } from "../api/list-meter-readings.api";
import { useListMeterReading } from "../hooks/use-list-meter-reading.hook";
import { DataTable } from "@/components/data-table";
import { meterConsumptionColumns } from "./meter-consumption.colums";
import { MeterConsumptionDerivation } from "./meter-consumption-derivation";


export type ManageMeterConsumptionProps = {
    meter: Meter;
}

export function ManageMeterConsumption({meter}: ManageMeterConsumptionProps) {
     const [filters, setFilter] = useState<ListMeterReadingsFilters>({meterId: meter.id, pageSize: 5, page: 1});
    
    
      const { data, isLoading, error, refetch } = useListMeterReading(filters);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Consumption</CardTitle>
                <CardDescription>view and manage consumption history of this derived meter.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-end items-end"><MeterConsumptionDerivation meter={meter}/></div>
                <div>
                    <p className="text-sm font-medium mb-2">Consumption History</p>
                    <DataTable
                        columns={meterConsumptionColumns}
                        data={data?.data || []}
                        emptyMessage="No meter consumptions found."
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
    );
}