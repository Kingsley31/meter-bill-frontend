'use client'
import { MeterConsumptionChart } from "@/features/meter/components/meter-consumption.chart";
import NavbarDB from "../../components/navbar";
import { MetailDetail } from "@/features/meter/components/meter-detail";
import { useGetMeter } from "@/features/meter/hooks/use-get-meter.hooks";
import { use } from "react";
import { getErrorMessage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { MeterManagementTab } from "@/features/meter/components/meter-management.tab";
import { ManageMeterCustomer } from "@/features/customer-meter/components/manage-meter-customers";
import { useAreaOptions } from "@/shared/area/hooks/use-area-options.hook";
import { useMeterOptions } from "@/shared/meter/hooks/use-meter-options.hook";

export default function MeterDtailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const { data, isLoading, error, refetch } = useGetMeter({meterId: id});
     const {loadOptions:loadAreaOptions} =  useAreaOptions();
     const {loadOptions:loadMeterOptions} = useMeterOptions();

    return (
        <main>
            <NavbarDB title="Meter Details" showBackBtn/>
            <div className="my-8 mx-4 md:mx-auto">
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <MeterConsumptionChart meterId={id}/>
                </div>
                <div className="h-10"></div>
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <MetailDetail 
                        meterIsLoading={isLoading}
                        loadAreaOptions={loadAreaOptions}
                        loadMeterOptions={loadMeterOptions} 
                        meter={data} 
                        meterError={error ? getErrorMessage(error) : null}
                        refetch={refetch} 
                    />
                </div>
                <div className="h-14"></div>
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                   {isLoading ? (<Skeleton className="w-full h-[250px]"/>): data && (<MeterManagementTab meter={data} refetch={refetch} manageCustomersTab={<ManageMeterCustomer meter={data} refetch={refetch}/>} />)}
                </div>
            </div>
        </main>
    );
}