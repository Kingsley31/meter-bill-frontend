'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllMetersTable } from "./all-meters.table";
import { UnreadMetersTable } from "./unread-meters.table";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingTable } from "@/components/loading-table";
import { Suspense } from "react";
import { ReadExceptionMetersTable } from "./read-exception-meters.table";
import { ConsumptionExceptionMetersTable } from "./consumption-exception-meters.table";

export function MetersTab() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const cleanSearchParams = () => {
        const params = new URLSearchParams();
        searchParams.forEach((v, k) => {
            if (k == 'areaId' && v != 'all') params.set(k, v);
        });
        router.replace(`?${params.toString()}`);
    }
    return (
        <Tabs className="w-full" defaultValue="all" onValueChange={cleanSearchParams}>
            <TabsList className="flex flex-wrap sm:flex-nowrap h-fit">
                <TabsTrigger value="all">All Meters</TabsTrigger>
                <TabsTrigger value="unread">Unread Meters</TabsTrigger>
                <TabsTrigger value="read-exception">Reading Exceptions</TabsTrigger>
                <TabsTrigger value="consumption-exception">Consumption Exceptions</TabsTrigger>
            </TabsList>
            <TabsContent value="all"><Suspense fallback={<LoadingTable/>}><AllMetersTable /></Suspense></TabsContent>
            <TabsContent value="unread"><Suspense fallback={<LoadingTable/>}><UnreadMetersTable /></Suspense></TabsContent>
            <TabsContent value="read-exception"><Suspense fallback={<LoadingTable/>}><ReadExceptionMetersTable /></Suspense></TabsContent>
            <TabsContent value="consumption-exception"><Suspense fallback={<LoadingTable/>}><ConsumptionExceptionMetersTable /></Suspense></TabsContent>
        </Tabs>
    );
}