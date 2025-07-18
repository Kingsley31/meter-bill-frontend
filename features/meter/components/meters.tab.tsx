'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllMetersTable } from "./all-meters.table";
import { UnreadMetersTable } from "./unread-meters.table";
import { useRouter } from "next/navigation";
import { LoadingTable } from "@/components/loading-table";
import { Suspense } from "react";

export function MetersTab() {
    const router = useRouter();
    return (
        <Tabs defaultValue="all" onValueChange={()=> router.replace("?")}>
            <TabsList>
                <TabsTrigger value="all">All Meters</TabsTrigger>
                <TabsTrigger value="unread">Unread Meters</TabsTrigger>
            </TabsList>
            <TabsContent value="all"><Suspense fallback={<LoadingTable/>}><AllMetersTable /></Suspense></TabsContent>
            <TabsContent value="unread"><Suspense fallback={<LoadingTable/>}><UnreadMetersTable /></Suspense></TabsContent>
        </Tabs>
    );
}