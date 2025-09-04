import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bill } from "../bill.types";
import { ManageBillRecipients } from "./manage-bill-recipient";
import { ManageBillBreakdowns } from "./manage-bill-breakdowns";



export type BillManagementTabProps = {
    bill: Bill;
    refetch: () => void;
}
export function BillManagementTab({bill, refetch }: BillManagementTabProps) {
    return (
        <Tabs defaultValue="recipient" className="w-full">
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="recipient" className="">Recipients</TabsTrigger>
                <TabsTrigger value="breakdown" className="">Breakdowns</TabsTrigger>
            </TabsList>
            <TabsContent value="recipient"><ManageBillRecipients bill={bill}/></TabsContent>
            <TabsContent value="breakdown"><ManageBillBreakdowns bill={bill} refetch={refetch} /></TabsContent>
        </Tabs>
    );
}

//data-[state=active]:bg-primary data-[state=active]:text-white