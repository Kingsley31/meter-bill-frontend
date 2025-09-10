import { Suspense } from "react";
import NavbarDB from "../../../components/navbar";
import { LoadingTable } from "@/components/loading-table";
import { AllBillGenerationRequestsTable } from "@/features/bills/components/all-bill-generation-requests.table";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaSwitcher } from "@/features/area/components/area-switcher";

export default function BillGenerationStatuesPage() {
    return (
        <main>
            <NavbarDB title="Bills Generation Status" showBackBtn/>
            <div className="my-8 mx-4 md:mx-auto">
                 <div className="flex justify-end w-full md:w-2xl lg:w-3xl mx-auto"><Suspense fallback={<Skeleton className="h-5 w-40"/>}><AreaSwitcher/></Suspense></div>
                <div className="h-10"></div>
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <Suspense fallback={<LoadingTable/>}><AllBillGenerationRequestsTable/></Suspense>
                </div>
            </div>
        </main>
      );
}