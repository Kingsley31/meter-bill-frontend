import { Button } from "@/components/ui/button";
import NavbarDB from "../components/navbar";
import Link from "next/link";
import { routes } from "@/data/routes";
import { DownloadIcon, PlusIcon } from "lucide-react";
import { MeterStatistics } from "@/features/meter/components/meter-statistics";
import { AllMetersTable } from "@/features/meter/components/all-meters.table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ListMeterPage() {
    return (
        <main className="overflow-x-hidden">
            <NavbarDB>
                <h1 className="text-base font-medium">Electric Meters</h1>
                <div className="space-x-6">
                    <Button variant="outline">Export<DownloadIcon className="h-4 w-4" /></Button>
                    <Button asChild><Link href={routes.createMeter.path}>Add Meter<PlusIcon className="h-4 w-4" /></Link></Button>
                </div>
            </NavbarDB>
            <div className="mx-3 my-8 w-full max-w-3xl md:mx-auto">
                <MeterStatistics />
                <div className="h-10"></div>
                <Tabs defaultValue="account" className="w-full">
                    <TabsList>
                        <TabsTrigger value="all">All Meters</TabsTrigger>
                        <TabsTrigger value="unread">Unread Meters</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all"><AllMetersTable /></TabsContent>
                    <TabsContent value="unread"><AllMetersTable /></TabsContent>
                </Tabs>
            </div>
        </main>
    );
}