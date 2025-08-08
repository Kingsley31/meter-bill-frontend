import { DataTable } from "@/components/data-table";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area } from "@/shared/area/types";
import { ListMeterFilters } from "@/shared/meter/api/list-meter.api";
import { useListMeter } from "@/shared/meter/hooks/use-list-meter.hook";
import { useState } from "react";
import { getAreaMeterColumns } from "./area-meter.colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/data/routes";

export type ManageAreaMeterProps = {
    area: Area;
    refetch: () => void;
};
export function ManageAreaMeter({area }:ManageAreaMeterProps) {
    const [filters, setFilter] = useState<ListMeterFilters>({
        page:1,
        pageSize: 5,
        areaId: area.id,
    });


    const { data, isLoading, error, refetch } = useListMeter(filters);

    return (
    <Card className="w-full max-w-screen mx-auto">
        <CardHeader>
        <CardTitle>Area Meters</CardTitle>
        <CardDescription>
            View, filter, and manage all electric meters in {area.areaName}.
        </CardDescription>
        <CardAction><Button variant="default" asChild><Link href={`${routes.meters.path}?areaId=${area.id}`}>Manage All</Link></Button></CardAction>
        </CardHeader>
        <CardContent>
        <DataTable
            columns={getAreaMeterColumns({refetch})}
            data={data?.data || []}
            emptyMessage="No area meters found."
            loading={isLoading}
            skeletonRows={5}
            pagination={{
            pageIndex: filters.page ?? 1 - 1,
            pageSize: filters.pageSize,
            total: data?.total || 0,
            }}
            setPagination={(page: number, pageSize: number) => setFilter((prev) => {return {...prev,page,pageSize}})}
            error={error}
            onRetry={refetch}
        />
        </CardContent>
    </Card>
    );
}