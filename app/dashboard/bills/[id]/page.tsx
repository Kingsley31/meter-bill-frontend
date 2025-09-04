'use client';
import { useGetBill } from "@/features/bills/hooks/use-get-bill.hooks";
import { use } from "react";
import NavbarDB from "../../components/navbar";
import { BillDetail } from "@/features/bills/components/bill-detail";
import { getErrorMessage } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BillManagementTab } from "@/features/bills/components/bill-management.tab";

export default function BillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const { data, isLoading, error, refetch } = useGetBill({billId: id});

    return (
            <main>
                <NavbarDB title="Bill Details" showBackBtn/>
                <div className="my-8 mx-4 md:mx-auto">
                    <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                        <BillDetail
                            billIsLoading={isLoading}
                            bill={data} 
                            billError={error ? getErrorMessage(error) : null}
                            refetch={refetch} 
                        />
                    </div>
                    <div className="h-14"></div>
                    <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                       {isLoading ? (<Skeleton className="w-full h-[250px]"/>): data && (<BillManagementTab bill={data} refetch={refetch} />)}
                    </div>
                </div>
            </main>
        );
}