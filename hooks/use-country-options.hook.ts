import { getErrorMessage } from "@/lib/utils";
import { displayError } from "@/components/display-message";
import { LoadOptions } from "@/components/paginated-async-select";
import { Country, ICountry }  from 'country-state-city';

export type CountryOption = {
    value: string;
    label: string;
    country: ICountry;
}

const getCountryOptions: LoadOptions<CountryOption>= (inputValue: string, loadedOptions, additional) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const countries = Country.getAllCountries().filter((c)=> c.name.toLowerCase().includes(inputValue.toLowerCase().trim()));
        const paginatedCountries = countries.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
    
      const hasNextPage = page * pageSize < countries.length
        const options: CountryOption[] = paginatedCountries.map(country=> ({
            value: country.name,
            label: country.name,
            country: country,
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
        displayError("Error fetching country options", message);
        return {
            options: [],
            hasMore: false,
            additional: {
                page: page + 1,
            },
        };
    }
}

export const useCountryOptions = () => {
    const loadOptions: LoadOptions<CountryOption> = async (inputValue, loadedOptions, additional) => {
        return await getCountryOptions(inputValue, loadedOptions, additional);
    };

    return {loadOptions};
}