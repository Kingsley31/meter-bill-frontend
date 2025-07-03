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
        <main>
            <NavbarDB title="Electric Meters">
                <div className="flex space-x-2 md:space-x-6">
                    <Button variant="outline" size="sm">Export<DownloadIcon className="h-4 w-4" /></Button>
                    <Button size="sm" asChild><Link href={routes.createMeter.path}>Add Meter<PlusIcon className="h-4 w-4" /></Link></Button>
                </div>
            </NavbarDB>
            <div className="my-8 mx-4 md:mx-auto max-w-2xl w-full">
                <MeterStatistics />
                <div className="h-10"></div>
                <Tabs defaultValue="all">
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