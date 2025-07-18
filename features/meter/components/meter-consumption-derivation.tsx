import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Meter } from "@/shared/meter/types"
import { CalculatorIcon } from "lucide-react";
import { useGetMeter } from "../hooks/use-get-meter.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useListDerivedMeterSubMeters } from "../hooks/use-list-derived-meter-sub-meters.hooks";
import { format } from "date-fns";

export type MeterConsumptionDerivationProps = {
    meter: Meter;
}

export function MeterConsumptionDerivation({meter}: MeterConsumptionDerivationProps) {
    const {data:referenceData ,error:erroReference,isLoading: isLoadingReference, refetch:refetchReference} = useGetMeter({meterId: meter.calculationReferenceMeterId!});
    const {data, error, isLoading, refetch} = useListDerivedMeterSubMeters({meterId: meter.id});
    return (
        <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="default"><CalculatorIcon/>Derivations</Button>
      </DialogTrigger>
      <DialogContent className="w-full md:w-sm max-w-full p-6 rounded-xl">
        <DialogHeader>
             <DialogTitle>Consumption Derivation</DialogTitle>
            <DialogDescription>See how {meter.location} consumptions are derived.</DialogDescription>
        </DialogHeader>
       
        <div>
            <div className="mb-6">
                <p className="text-sm font-medium mb-2">Reference Meter</p>
                <div className="mb-2 p-4 justify-between border rounded-md">
                    <p className="text-xs font-medium">Meter Location: {erroReference?(<p className="text-destructive">Error.<span className="font-bold cursor-pointer" onClick={()=> refetchReference()}><u>reload</u></span></p>):isLoadingReference? (<Skeleton className="h-[10px] w-[80px] rounded-sm"/>):(<span className="font-light">{referenceData?.location}</span>)}</p>
                    <p className="text-xs font-medium mt-2">Meter Number: {erroReference?(<p className="text-destructive">Error.<span className="font-bold cursor-pointer" onClick={()=> refetchReference()}><u>reload</u></span></p>):isLoadingReference? (<Skeleton className="h-[10px] w-[80px] rounded-sm"/>):(<span className="font-light">{referenceData?.meterNumber}</span>)}</p>
                    <p className="text-xs font-medium mt-2">Last Read: {erroReference?(<p className="text-destructive">Error.<span className="font-bold cursor-pointer" onClick={()=> refetchReference()}><u>reload</u></span></p>):isLoadingReference? (<Skeleton className="h-[10px] w-[80px] rounded-sm"/>):(<span className="font-light">{referenceData?.currentKwhReadingDate ? format(new Date(referenceData.currentKwhReadingDate),"PPP"):"N/A"}</span>)}</p>
                    <p className="text-xs font-medium mt-2">Current Consumption(kwh): {error?(<p className="text-destructive">Error.<span className="font-bold cursor-pointer" onClick={()=> refetchReference()}><u>reload</u></span></p>):isLoadingReference? (<Skeleton className="h-[10px] w-[80px] rounded-sm"/>):(<span className="font-light">{referenceData?.currentKwhConsumption ?? 0}</span>)}</p>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-sm font-medium mb-2">Sub Meters</p>
                <div className="mb-2 p-4 border rounded-md">
                    {error?(<p className="text-destructive">Error fetching sub meters.<span className="font-bold cursor-pointer" onClick={()=> refetch()}><u>reload</u></span></p>): isLoading?
                    (meter.subMeters.map((sub)=> (<Skeleton key={sub.subMeterId} className="h-[60px] w-[80px] rounded-sm mt-2"/>))):
                        (data?.map((sub,i) => (<div key={sub.meterNumber}>
                            <p className={`text-xs font-medium ${i > 0 ? "mt-4" : ""}`}>Meter Location: <span className="font-light">{sub.location}</span></p>
                            <p className={`text-xs font-medium mt-2`}>Meter Number: <span className="font-light">{sub.meterNumber}</span></p>
                            <p className={`text-xs font-medium mt-2`}>Last Read: <span className="font-light">{sub.currentKwhReadingDate ? format(new Date(sub.currentKwhReadingDate),"PPP"):"N/A"}</span></p>
                            <p className="text-xs font-medium mt-2">Current Consumption(kwh): <span className="font-light">{sub.currentKwhConsumption ?? 0}</span></p>
                            {(i < data.length - 1)&& <Separator className="mt-4"/>}
                            </div>)))}
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
    );
}