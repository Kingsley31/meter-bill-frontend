import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateAreaBills } from "./generate-area-bills.form";
import { GenerateLeadersBill } from "./generate-leaders-bill.form";
import { GenerateCustomerBill } from "./generate-customer-bill.form";





export function BillGenerationTab() {
    return (
        <Tabs defaultValue="area-bills" className="w-full">
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="area-bills" className="">Generate Area Bills</TabsTrigger>
                <TabsTrigger value="leaders-bill" className="">Generate Leaders Bill</TabsTrigger>
                <TabsTrigger value="customer-bill" className="">Generate Customer Bill</TabsTrigger>
            </TabsList>
            <TabsContent value="area-bills"><GenerateAreaBills/></TabsContent>
            <TabsContent value="leaders-bill"><GenerateLeadersBill /></TabsContent>
            <TabsContent value="customer-bill"><GenerateCustomerBill /></TabsContent>
        </Tabs>
    );
}

//data-[state=active]:bg-primary data-[state=active]:text-white