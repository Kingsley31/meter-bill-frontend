'use client';

import NavbarDB from "../../components/navbar";
import { BillGenerationTab } from "@/features/bills/components/bill-generation.tab";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/data/routes";
import { EyeIcon } from "lucide-react";

export default function GenerateBillPage() {
    return (
        <main>
             <NavbarDB title="Generate Bills">
                <div className="flex space-x-2 md:space-x-6">
                    {/* <Button variant="outline" size="sm">Export<DownloadIcon className="h-4 w-4" /></Button> */}
                    <Button size="sm" asChild><Link href={routes.billGenerationStatus.path}>Generation Statuses<EyeIcon className="h-4 w-4" /></Link></Button>
                </div>
            </NavbarDB>
             <div className="my-8 mx-4 md:mx-auto">
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <Suspense fallback={<Skeleton className="h-100 w-full"/>}><BillGenerationTab /></Suspense>
                </div>
             </div>
        </main>
    );
}