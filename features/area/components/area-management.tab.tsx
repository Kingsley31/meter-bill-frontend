import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area } from "@/shared/area/types";
import { ManageAreaTariffs } from "./manage-area-tariffs";
import { ManageAreaLeaders } from "./manage-area-leaders";



export type AreaManagementTabProps = {
    area: Area;
    manageMetersTab: React.ReactNode;
    refetch: () => void;
}
export function AreaManagementTab({area, refetch,manageMetersTab }: AreaManagementTabProps) {
    return (
        <Tabs defaultValue="leader" className="w-full">
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="leader" className="">Manage Leaders</TabsTrigger>
                <TabsTrigger value="tarrif" className="">Manage Tarrifs</TabsTrigger>
                <TabsTrigger value="meter" className="">Manage Meters</TabsTrigger>
            </TabsList>
            <TabsContent value="leader"><ManageAreaLeaders area={area} refetch={refetch}/></TabsContent>
            <TabsContent value="tarrif"><ManageAreaTariffs area={area} refetch={refetch} /></TabsContent>
            <TabsContent value="meter">{manageMetersTab}</TabsContent>
        </Tabs>
    );
}

//data-[state=active]:bg-primary data-[state=active]:text-white