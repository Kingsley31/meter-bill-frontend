import { Button } from "@/components/ui/button";
import NavbarDB from "../components/navbar";
import Link from "next/link";
import { routes } from "@/data/routes";
import { PlusIcon } from "lucide-react";
import { AreaStatistics } from "@/features/area/components/area-statistics";
import { AllAreasTable } from "@/features/area/components/all-areas.table";

export default function ListAreaPage() {
    return (
        <main>
            <NavbarDB title="Areas">
                <div className="flex space-x-2 md:space-x-6">
                    {/* <Button variant="outline" size="sm">Export<DownloadIcon className="h-4 w-4" /></Button> */}
                    <Button size="sm" asChild><Link href={routes.createArea.path}>Add Area<PlusIcon className="h-4 w-4" /></Link></Button>
                </div>
            </NavbarDB>
            <div className="my-8 mx-4 md:mx-auto">
                <div className="w-full md:w-2xl lg:w-3xl mx-auto"><AreaStatistics /></div>
                <div className="h-10"></div>
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <AllAreasTable/>
                </div>
            </div>
        </main>
    );
}