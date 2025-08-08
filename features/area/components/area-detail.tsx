import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Area } from "@/shared/area/types";
// import { EditAreaDetailDialog } from "./edit-area-detail.dialog";
import { LoadOptions } from "@/components/paginated-async-select";
import { CountryOption } from "@/hooks/use-country-options.hook";
import { StateOption } from "@/hooks/use-state-options.hook copy";
import { CityOption } from "@/hooks/use-cities-options.hook";
import { ICountry, IState } from "country-state-city";

export type AreaDetailProp = {
    area?: Area;
    areaIsLoading: boolean;
    areaError?: string | null;
    refetch: () => void;
    loadCountryOptions: LoadOptions<CountryOption>; 
    loadStateOptions: LoadOptions<StateOption>;
    loadCityOptions: LoadOptions<CityOption>;
    currentCountryOption: ICountry | undefined;
    onCountryChange: (country: ICountry | undefined) => void;
    currentStateOption: IState | undefined;
    onStateChange: (state: IState | undefined) => void;
}
export function AreaDetail({area, areaIsLoading, areaError, refetch }: AreaDetailProp) {
    return (
        <main>
            <div className="flex items-center justify-between mx-4 my-2">
                <h1 className="text-md font-semibold">Details</h1>
            </div>
            <Card>
                <CardContent>
                    {areaError ? 
                        (<p className="mx-auto text-destructive text-sm">
                            Error loading area. 
                            {refetch && (<span className="font-bold cursor-pointer" onClick={()=> refetch()}><u>reload</u></span>)}
                        </p>):(<>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0">
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">Area Name:</span>
                            {areaIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{area?.areaName ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">City:</span>
                            {areaIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{area?.city ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium">State:</span>
                            {areaIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{area?.state ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-center justify-between md:border-l md:pl-4 md:pb-4">
                            <span className="text-sm font-medium">Country:</span>
                            {areaIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm">{area?.country ?? "N/A"}</span>)}
                        </div>
                        <div className="flex items-start justify-between md:border-r md:pr-4 md:pb-4">
                            <span className="text-sm font-medium mr-auto">Address:</span>
                            {areaIsLoading ? (<Skeleton className="h-[20px] w-[70px] rounded-sm"/>):(
                            <span className="text-sm text-right">{area?.address ?? "N/A"}</span>)}
                        </div>
                        <div className="md:border-l md:pl-4 md:pb-4"></div>
                    </div>
                    {/* <div className="flex flex-col items-end">{area? 
                    (<EditAreaDetailDialog 
                        area={area} 
                        refetch={refetch}
                        loadCountryOptions={loadCountryOptions} 
                        loadStateOptions={loadStateOptions}
                        loadCityOptions={loadCityOptions}
                        currentCountryOption={currentCountryOption}
                        onCountryChange={onCountryChange}
                        currentStateOption={currentStateOption}
                        onStateChange={onStateChange}
                    />):(<Skeleton className="h-[20px] w-[70px] rounded-sm"/>)}</div> */}
                    </>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}