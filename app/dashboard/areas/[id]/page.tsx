'use client'

import { useGetArea } from "@/features/area/hooks/use-get-area.hooks";
import NavbarDB from "../../components/navbar";
import { use, useState } from "react";
import { Country, ICountry, IState, State } from "country-state-city";
import { useCountryOptions } from "@/hooks/use-country-options.hook";
import { useStateOptions } from "@/hooks/use-state-options.hook copy";
import { useCityOptions } from "@/hooks/use-cities-options.hook";
import { getErrorMessage } from "@/lib/utils";
import { AreaDetail } from "@/features/area/components/area-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { AreaManagementTab } from "@/features/area/components/area-management.tab";
import { ManageAreaMeter } from "@/features/meter/components/manage-area-meter";

export default function AreaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
    const { id } = use(params);
    const { data, isLoading, error, refetch } = useGetArea({areaId: id});
    //  const {loadOptions:loadAreaOptions} =  useAreaOptions();
    //  const {loadOptions:loadMeterOptions} = useMeterOptions();
    const [currentCountryOption, setCurrentCountryOption] = useState<ICountry|undefined>(Country.getCountryByCode("NG"));
    const countryCode = currentCountryOption?.isoCode??"NG";
    const [currentStateOption, setCurrentStateOption] = useState<IState|undefined>(State.getStateByCodeAndCountry("AB",countryCode));
    const {loadOptions:loadCountryOptions} =  useCountryOptions();
    const {loadOptions:loadStateOptions} = useStateOptions(countryCode);
    const {loadOptions:loadCityOptions} = useCityOptions(countryCode,currentStateOption?.isoCode?? "AB");

    return (
        <main>
            <NavbarDB title="Area Details" showBackBtn/>
            <div className="my-8 mx-4 md:mx-auto">
                {/* <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <MeterConsumptionChart meterId={id}/>
                </div>
                <div className="h-10"></div> */}
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                    <AreaDetail
                        areaIsLoading={isLoading}
                        loadCountryOptions={loadCountryOptions} 
                        loadStateOptions={loadStateOptions}
                        loadCityOptions={loadCityOptions}
                        currentCountryOption={currentCountryOption}
                        onCountryChange={setCurrentCountryOption}
                        currentStateOption={currentStateOption}
                        onStateChange={setCurrentStateOption}
                        area={data} 
                        areaError={error ? getErrorMessage(error) : null}
                        refetch={refetch} 
                    />
                </div>
                <div className="h-14"></div>
                <div className="w-full md:w-2xl lg:w-3xl mx-auto">
                   {isLoading ? (<Skeleton className="w-full h-[250px]"/>): data && (<AreaManagementTab area={data} refetch={refetch} manageMetersTab={<ManageAreaMeter area={data} refetch={refetch}/>} />)}
                </div>
            </div>
        </main>
    );
}