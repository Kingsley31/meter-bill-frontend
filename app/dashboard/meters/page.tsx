import { Button } from "@/components/ui/button";
import NavbarDB from "../components/navbar";
import Link from "next/link";
import { routes } from "@/data/routes";
import { PlusIcon } from "lucide-react";
import { MeterStatistics } from "@/features/meter/components/meter-statistics";
import { MetersTab } from "@/features/meter/components/meters.tab";

export default function ListMeterPage() {
    return (
        <main>
            <NavbarDB title="Electric Meters">
                <div className="flex space-x-2 md:space-x-6">
                    {/* <Button variant="outline" size="sm">Export<DownloadIcon className="h-4 w-4" /></Button> */}
                    <Button size="sm" asChild><Link href={routes.createMeter.path}>Add Meter<PlusIcon className="h-4 w-4" /></Link></Button>
                </div>
            </NavbarDB>
            <div className="my-8 mx-4 md:mx-auto">
                <div className="w-full md:w-2xl mx-auto"><MeterStatistics /></div>
                <div className="h-10"></div>
                <div className="w-full md:w-2xl mx-auto">
                    <MetersTab/>
                </div>
            </div>
        </main>
    );
}