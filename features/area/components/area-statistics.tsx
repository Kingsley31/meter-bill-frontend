"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LandPlot, BotOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { displayError } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { useAreaStats } from "../hooks/use-area-stats.hook";

export function AreaStatistics() {
	// Replace these with real data from your store or API as needed
	const {data, isLoading, error }= useAreaStats();

	if (error) {
		const message = getErrorMessage(error);
		displayError("Error Fetching Meter Stats",message);
	}

	return (
		<div className="w-full max-w-screen grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Areas</CardTitle>
					<LandPlot className="h-5 w-5 text-primary" />
				</CardHeader>
				<CardContent>
					{isLoading ? (<Skeleton className="h-4 w-2/3" />):(<div className="text-2xl font-bold">{data?.totalAreas ?? 0}</div>)}
					<div className="text-xs text-muted-foreground mt-1">
						All areas registered in the system
					</div>
				</CardContent>
			</Card>
			{/* <Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Active Meters</CardTitle>
					<Zap className="h-5 w-5 text-green-600" />
				</CardHeader>
				<CardContent>
					{isLoading ? 
					(<Skeleton className="h-4 w-2/3" />)
					:
					(<div className="text-2xl font-bold">{data?.totalActiveMeters ?? 0}</div>)}
					<div className="text-xs text-muted-foreground mt-1">
						Meters currently active and reporting
					</div>
				</CardContent>
			</Card> */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Unassigned Areas</CardTitle>
					<BotOff className="h-5 w-5 text-blue-600" />
				</CardHeader>
				<CardContent>
					{isLoading ? 
					(<Skeleton className="h-4 w-2/3" />)
					:
					(<div className="text-2xl font-bold">{data?.totalUnassignedAreas ?? 0}</div>)}
					<div className="text-xs text-muted-foreground mt-1">
						Areas without meters
					</div>
				</CardContent>
			</Card>
			{/* <Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Average Consumption</CardTitle>
					<TrendingUp className="h-5 w-5 text-orange-600" />
				</CardHeader>
				<CardContent>
					{isLoading ? 
					(<Skeleton className="h-4 w-2/3" />)
					:
					(<div className="text-2xl font-bold">
						{data?.averageEnergyConsumption ? data?.averageEnergyConsumption.toLocaleString() : 0} kWh
					</div>)}
					<div className="text-xs text-muted-foreground mt-1">
						Recent average kWh consumed by all meters
					</div>
				</CardContent>
			</Card> */}
		</div>
	);
}