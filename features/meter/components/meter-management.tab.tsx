import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignMeterArea } from "./assign-meter-area.form";
import { Meter } from "@/shared/meter/types";
import { MeterType } from "@/shared/meter/enums";
import { ManageMeterReadings } from "./manage-meter-readings";
import { ManageMeterConsumption } from "./manage-meter-consumption.table";
import { ManageMeterTariff } from "./manage-meter-tariffs";


export type MeterManagementTabProps = {
    meter: Meter;
    manageCustomersTab: React.ReactNode;
    refetch: () => void;
}
export function MeterManagementTab({meter, refetch,manageCustomersTab }: MeterManagementTabProps) {
    return (
        <Tabs defaultValue="area" className="w-full">
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="area" className="">Assign Area</TabsTrigger>
                <TabsTrigger value="customer" className="">Manage Customers</TabsTrigger>
                <TabsTrigger value="tarrif" className="">Manage Tarrifs</TabsTrigger>
                {(meter.type == MeterType.DERIVED) && (<TabsTrigger value="calculate-reading" className="">Consumption</TabsTrigger>)}
                {(meter.type == MeterType.MEASUREMENT) && (<TabsTrigger value="reading" className="">Manage Readings</TabsTrigger>)}
            </TabsList>
            <TabsContent value="area"><AssignMeterArea meter={meter} refetch={refetch}/></TabsContent>
            <TabsContent value="customer">{manageCustomersTab}</TabsContent>
            {(meter.type == MeterType.DERIVED) && (<TabsContent value="calculate-reading"><ManageMeterConsumption meter={meter}/></TabsContent>)}
            {(meter.type == MeterType.MEASUREMENT) && (<TabsContent value="reading"><ManageMeterReadings meter={meter} refetch={refetch}/></TabsContent>)}
            <TabsContent value="tarrif"><ManageMeterTariff meter={meter} refetch={refetch} /></TabsContent>
        </Tabs>
    );
}

//data-[state=active]:bg-primary data-[state=active]:text-white