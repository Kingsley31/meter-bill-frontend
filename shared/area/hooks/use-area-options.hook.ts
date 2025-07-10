import { getErrorMessage } from "@/lib/utils";
import { listAreas } from "../api/list-area.api";
import { Area } from "../types";
import { displayError } from "@/components/display-message";
import { LoadOptions } from "@/components/paginated-async-select";

export type AreaOption = {
    value: string;
    label: string;
    area: Area;
}

const getAreaOptions: LoadOptions = async (inputValue: string, loadedOptions, additional) => {
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
            label: area.name,
            area: area
        }));
        return {
            options,
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

export const useAreaOptions = () => {
    const loadOptions: LoadOptions = async (inputValue, loadedOptions, additional) => {
        return await getAreaOptions(inputValue, loadedOptions, additional);
    };

    return {loadOptions};
}