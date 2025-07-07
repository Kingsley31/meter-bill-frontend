import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Meter } from "../meter.types";
import { MeterType } from "../meter.enums";
import { MeterArea } from "./meter-area";

export type MeterManagementTabProps = {
    meter: Meter;
}
export function MeterManagementTab({meter}: MeterManagementTabProps) {
    return (
        <Tabs defaultValue="area" className="w-full">
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="area" className="data-[state=active]:bg-primary data-[state=active]:text-white">Manage Area</TabsTrigger>
                {(meter.type == MeterType.DERIVED) && (<TabsTrigger value="calculate-reading" className="data-[state=active]:bg-primary data-[state=active]:text-white">Calculate Reading</TabsTrigger>)}
                {(meter.type == MeterType.MEASUREMENT) && (<TabsTrigger value="reading" className="data-[state=active]:bg-primary data-[state=active]:text-white">Manage Readings</TabsTrigger>)}
                <TabsTrigger value="customer" className="data-[state=active]:bg-primary data-[state=active]:text-white">Manage Customer</TabsTrigger>
                <TabsTrigger value="tarrif" className="data-[state=active]:bg-primary data-[state=active]:text-white">Manage Tarrif</TabsTrigger>
            </TabsList>
            <TabsContent value="area"><MeterArea /></TabsContent>
            {(meter.type == MeterType.DERIVED) && (<TabsContent value="calculate-reading">Calculate meter reading here.</TabsContent>)}
            {(meter.type == MeterType.MEASUREMENT) && (<TabsContent value="reading">Manage meter reading here.</TabsContent>)}
            <TabsContent value="customer">Manage meter customer here.</TabsContent>
            <TabsContent value="tarrif">Change meter tarrif here.</TabsContent>
        </Tabs>
    );
}