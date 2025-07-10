import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignMeterArea } from "./assign-meter-area.form";
import { AssignMeterCustomer } from "./assign-meter-customer.form";
import { Meter } from "@/shared/meter/types";
import { MeterType } from "@/shared/meter/enums";


export type MeterManagementTabProps = {
    meter: Meter;
    refetch: () => void;
}
export function MeterManagementTab({meter, refetch }: MeterManagementTabProps) {
    return (
        <Tabs defaultValue="area" className="w-full">
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="area" className="data-[state=active]:bg-primary data-[state=active]:text-white">Assign Area</TabsTrigger>
                <TabsTrigger value="customer" className="data-[state=active]:bg-primary data-[state=active]:text-white">Assign Customer</TabsTrigger>
                <TabsTrigger value="tarrif" className="data-[state=active]:bg-primary data-[state=active]:text-white">Set Tarrif</TabsTrigger>
                {(meter.type == MeterType.DERIVED) && (<TabsTrigger value="calculate-reading" className="data-[state=active]:bg-primary data-[state=active]:text-white">Calculate Reading</TabsTrigger>)}
                {(meter.type == MeterType.MEASUREMENT) && (<TabsTrigger value="reading" className="data-[state=active]:bg-primary data-[state=active]:text-white">Manage Readings</TabsTrigger>)}
            </TabsList>
            <TabsContent value="area"><AssignMeterArea meter={meter} refetch={refetch}/></TabsContent>
            <TabsContent value="customer"><AssignMeterCustomer meter={meter} refetch={refetch}/></TabsContent>
            {(meter.type == MeterType.DERIVED) && (<TabsContent value="calculate-reading">Calculate meter reading here.</TabsContent>)}
            {(meter.type == MeterType.MEASUREMENT) && (<TabsContent value="reading">Manage meter reading here.</TabsContent>)}
            <TabsContent value="tarrif">Change meter tarrif here.</TabsContent>
        </Tabs>
    );
}