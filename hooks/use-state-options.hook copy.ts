import { getErrorMessage } from "@/lib/utils";
import { displayError } from "@/components/display-message";
import { Additional, LoadOptions, OptionType } from "@/components/paginated-async-select";
import { State, IState }  from 'country-state-city';
import { GroupBase, OptionsOrGroups } from "react-select";

export type StateOption = {
    value: string;
    label: string;
    state: IState;
}

export type StateLoadOption = (inputValue: string, loadedOptions:OptionsOrGroups<OptionType, GroupBase<OptionType>>, additional: Additional | undefined,countryCode?: string) => ReturnType<LoadOptions<StateOption>>;
const getStateOptions: StateLoadOption = (inputValue: string, loadedOptions, additional,countryCode?: string) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const states = State.getStatesOfCountry(countryCode).filter((s)=> s.name.toLowerCase().includes(inputValue.toLowerCase().trim()));
        const paginatedStates = states.slice(
        (page - 1) * pageSize,
        page * pageSize
      );
    
      const hasNextPage = page * pageSize < states.length
        const options: StateOption[] = paginatedStates.map(state=> ({
            value: state.name,
            label: state.name,
            state: state,
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

export const useStateOptions = (countryCode: string) => {
    console.log(countryCode);
    const loadOptions: LoadOptions<StateOption> = async (inputValue, loadedOptions, additional) => {
        return await getStateOptions(inputValue, loadedOptions, additional,countryCode);
    };

    return {loadOptions};
}