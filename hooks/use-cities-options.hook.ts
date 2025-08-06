import { getErrorMessage } from "@/lib/utils";
import { displayError } from "@/components/display-message";
import { Additional, LoadOptions, OptionType } from "@/components/paginated-async-select";
import { City, ICity }  from 'country-state-city';
import { GroupBase, OptionsOrGroups } from "react-select";

export type CityOption = {
    value: string;
    label: string;
    city: ICity;
}

export type CityLoadOption = (inputValue: string, loadedOptions:OptionsOrGroups<OptionType, GroupBase<OptionType>>, additional: Additional | undefined,countryCode: string,stateCode: string) => ReturnType<LoadOptions<CityOption>>;
const getCityOptions: CityLoadOption = (inputValue: string, loadedOptions, additional,countryCode: string,stateCode: string) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const cities = City.getCitiesOfState(countryCode, stateCode).filter((c)=> c.name.toLowerCase().includes(inputValue.toLowerCase().trim()));
        const paginatedCitys = cities.slice(
        (page - 1) * pageSize,
        page * pageSize);

      const hasNextPage = page * pageSize < cities.length
        const options: CityOption[] = paginatedCitys.map(city=> ({
            value: city.name,
            label: city.name,
            city: city,
        }));
        return {
            options,
            hasMore: hasNextPage,
            additional: {
                page: page + 1,
            },
        };
    } catch(error) {
        const message = getErrorMessage(error);
        displayError("Error fetching area options", message);
        return {
            options: [],
            hasMore: false,
            additional: {
                page: page + 1,
            },
        };
    }
}

export const useCityOptions = (countryCode: string, stateCode: string) => {
    const loadOptions: LoadOptions<CityOption> = async (inputValue, loadedOptions, additional) => {
        return await getCityOptions(inputValue, loadedOptions, additional,countryCode, stateCode);
    };

    return {loadOptions};
}