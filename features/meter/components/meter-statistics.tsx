"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gauge, Zap, EyeOff, TrendingUp } from "lucide-react";

export function MeterStatistics() {
	// Replace these with real data from your store or API as needed
	const totalMeters = 0;
	const activeMeters = 0;
	const totalUnreadMeters = 0;
	const totalConsumption = 0;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Meters</CardTitle>
					<Gauge className="h-5 w-5 text-primary" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalMeters}</div>
					<div className="text-xs text-muted-foreground mt-1">
						All meters registered in the system
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Active Meters</CardTitle>
					<Zap className="h-5 w-5 text-green-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{activeMeters}</div>
					<div className="text-xs text-muted-foreground mt-1">
						Meters currently active and reporting
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Unread Meters</CardTitle>
					<EyeOff className="h-5 w-5 text-blue-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalUnreadMeters}</div>
					<div className="text-xs text-muted-foreground mt-1">
						Meters without a recent reading
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Consumption</CardTitle>
					<TrendingUp className="h-5 w-5 text-orange-600" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						{totalConsumption.toLocaleString()} kWh
					</div>
					<div className="text-xs text-muted-foreground mt-1">
						Total kWh consumed by all meters
					</div>
				</CardContent>
			</Card>
		</div>
	);
}