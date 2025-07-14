import { Card, CardContent } from "@/components/ui/card";
import { MeterStatus } from "./meter-status";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Meter } from "@/shared/meter/types";

export type MeterDetailProp = {
    meter?: Meter;
    meterIsLoading: boolean;
    meterError?: string | null;
    refetch: () => void;
}
export function MetailDetail({meter, meterIsLoading, meterError, refetch }: MeterDetailProp) {
    return (
        <main>
            <div className="flex items-center justify-between mx-4 my-2">
                <h1 className="text-md font-semibold">Meter Details</h1>
                {!(meterError) ? meterIsLoading ? (<Skeleton className="h-[30px] w-[80px] rounded-sm"/>):(<MeterStatus meterId={meter?.id as string} isActive={meter?.isActive as boolean} refetch={refetch}/>):""}
            </div>
            <Card className={`shadow-${meter?.isActive ? "green-600": "destructive"}`}>
                <CardContent>
                    {meterError ? 
                        (<p className="mx-auto text-destructive text-sm">
                            Error loading meter. 
                            {refetch && (<span className="font-bold cursor-pointer" onClick={()=> refetch()}><u>reload</u></span>)}
                        </p>):(
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Meter ID:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.meterNumber ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">Type:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm"><Badge variant="outline">{meter?.type ?? "N/A"}</Badge></span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Purpose:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.purpose ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">CT Rating:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.ctRating ?? "0"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Multiplier Factor:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.ctMultiplierFactor ?? "0"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">Location:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.location ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Area:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.areaName ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">Current Reading:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.currentKwhReading ?? "0"} kWh</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Customer:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.customerName ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">Tariff (₦ / kwh):</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{meter?.tariff ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Status:</span>
                            {meterIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className={`text-sm ${meter?.isActive ? "text-green-600" : "text-destructive"}`}>{meter?.isActive ? "Active" : "Inactive"}</span>)}
                        </div>
                        <div className="md:border-l md:pl-4 md:pb-4"></div>
                    </div>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}