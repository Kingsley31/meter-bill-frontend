import { Button } from "@/components/ui/button";
import NavbarDB from "../components/navbar";
import Link from "next/link";
import { routes } from "@/data/routes";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { LoadingTable } from "@/components/loading-table";
import { AllBillsTable } from "@/features/bills/components/all-bills.table";
import { BillStatistics } from "@/features/bills/components/bill-statistics";
import { AreaSwitcher } from "@/features/area/components/area-switcher";
import { Skeleton } from "@/components/ui/skeleton";

export default function BillsPage() {
  return (
    <main>
        <NavbarDB title="Bills">
            <div className="flex space-x-2 md:space-x-6">
                {/* <Button variant="outline" size="sm">Export<DownloadIcon className="h-4 w-4" /></Button> */}
                <Button size="sm" asChild><Link href={routes.generateBill.path}>Generate Bills<PlusIcon className="h-4 w-4" /></Link></Button>
            </div>
        </NavbarDB>
        <div className="my-8 mx-4 md:mx-auto">
             <div className="flex justify-end w-full md:w-2xl lg:w-3xl mx-auto"><Suspense fallback={<Skeleton className="h-5 w-40"/>}><AreaSwitcher/></Suspense></div>
                <div className="h-4"></div>
                <div className="w-full md:w-2xl lg:w-3xl mx-auto"><Suspense fallback={<Skeleton className="h-100 w-full"/>}><BillStatistics /></Suspense></div>
            <div className="h-10"></div>
            <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                <Suspense fallback={<LoadingTable/>}><AllBillsTable/></Suspense>
            </div>
        </div>
    </main>
  );
}