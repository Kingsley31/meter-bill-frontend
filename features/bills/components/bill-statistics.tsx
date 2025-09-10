"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins, Handshake } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { displayError } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { BillStatsFilter } from "../api/bill-stats.api";
import { useBillStats } from "../hooks/use-bill-stats.hook";

export function BillStatistics() {
	const searchParams = useSearchParams();
	const filters: BillStatsFilter = searchParams.get('areaId')?{areaId:searchParams.get('areaId') as string}:{};
	// searchParams.forEach((value, key) => {
	// 	if (key === "areaId") {
	// 	(filters as Record<string, unknown>)[key] = value;
	// 	}
	// });
	console.log(filters);
	// Replace these with real data from your store or API as needed
	const {data, isLoading, error }= useBillStats(filters);

	if (error) {
		const message = getErrorMessage(error);
		displayError("Error Fetching Bill Stats",message);
	}

	return (
		<div className="w-full max-w-screen grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Payable</CardTitle>
					<HandCoins className="h-5 w-5 text-primary" />
				</CardHeader>
				<CardContent>
					{isLoading ? (<Skeleton className="h-4 w-2/3" />):(<div className="text-2xl font-bold">{data?.totalPayable ?? 0}</div>)}
					<div className="text-xs text-muted-foreground mt-1">
						Total number of non consolidated bills
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Paid</CardTitle>
					<Handshake className="h-5 w-5 text-green-600" />
				</CardHeader>
				<CardContent>
					{isLoading ? 
					(<Skeleton className="h-4 w-2/3" />)
					:
					(<div className="text-2xl font-bold">{data?.totalPaid ?? 0}</div>)}
					<div className="text-xs text-muted-foreground mt-1">
						Total number of bills paid for
					</div>
				</CardContent>
			</Card>
		</div>
	);
}