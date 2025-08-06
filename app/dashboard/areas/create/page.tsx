"use client"
import NavbarDB from "../../components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { routes } from "@/data/routes";
import { useState } from "react";
import { Country, ICountry, IState, State } from "country-state-city";
import { useCountryOptions } from "@/hooks/use-country-options.hook";
import { useStateOptions } from "@/hooks/use-state-options.hook copy";
import { useCityOptions } from "@/hooks/use-cities-options.hook";
import { CreateAreaForm } from "@/features/area/components/create-area.form";

export default function CreateAreaPage() {
    const [currentCountryOption, setCurrentCountryOption] = useState<ICountry|undefined>(Country.getCountryByCode("NG"));
    const countryCode = currentCountryOption?.isoCode??"NG";
    const [currentStateOption, setCurrentStateOption] = useState<IState|undefined>(State.getStateByCodeAndCountry("AB",countryCode));
    const {loadOptions:loadCountryOptions} =  useCountryOptions();
    const {loadOptions:loadStateOptions} = useStateOptions(countryCode);
    const {loadOptions:loadCityOptions} = useCityOptions(countryCode,currentStateOption?.isoCode?? "AB");

    return (
        <main>
            <NavbarDB title="Create Area" showBackBtn>
                <Button asChild><Link href={routes.areas.path}>View Areas<EyeIcon/></Link></Button>
            </NavbarDB>
            <div className="px-auto py-8 max-w-4xl mx-auto">
                <CreateAreaForm 
                        loadCountryOptions={loadCountryOptions} 
                        loadStateOptions={loadStateOptions}
                        loadCityOptions={loadCityOptions}
                        currentCountryOption={currentCountryOption}
                        onCountryChange={setCurrentCountryOption}
                        currentStateOption={currentStateOption}
                        onStateChange={setCurrentStateOption}
                    />
            </div>
        </main>
    );
}