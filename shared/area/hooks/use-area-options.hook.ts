import { getErrorMessage } from "@/lib/utils";
import { listAreas } from "../api/list-area.api";
import { Area } from "../types";
import { displayError } from "@/components/display-message";
import { Additional, LoadOptions, OptionType } from "@/components/paginated-async-select";
import { GroupBase, OptionsOrGroups } from "react-select";

export type AreaOption = {
    value: string;
    label: string;
    area: Area;
}
 export const AreaAllOption: AreaOption =  {
    label: 'All Areas',
    value: 'all',
    area: {
        id: 'all',
        areaName: 'all',
        state: 'all',city: 'all',
        country: 'all',
        totalMeters:0,
        createdAt:'all',
        address: 'all',
        updatedAt: 'all'
    },
 };
export type AreaLoadOption = (inputValue: string, loadedOptions:OptionsOrGroups<OptionType, GroupBase<OptionType>>, additional: Additional | undefined,includeAllOption?: boolean) => ReturnType<LoadOptions<AreaOption>>;
const getAreaOptions: AreaLoadOption = async (inputValue: string, loadedOptions, additional,includeAllOption?: boolean) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const areas = await listAreas({
            search: inputValue,
            page,
            pageSize,
        });
        const options: AreaOption[] = areas.data.map(area => ({
            value: area.id,
            label: area.areaName,
            area: area
        }));
        if(includeAllOption) options.unshift(AreaAllOption);
        return {
            options: options,
            hasMore: areas.hasMore,
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

export const useAreaOptions = (includeAllOption?: boolean) => {
    const loadOptions: LoadOptions<AreaOption> = async (inputValue, loadedOptions, additional) => {
        return await getAreaOptions(inputValue, loadedOptions, additional,includeAllOption);
    };

    return {loadOptions};
}