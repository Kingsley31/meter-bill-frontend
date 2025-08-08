import { getErrorMessage } from "@/lib/utils";
import { listMeters } from "../api/list-meter.api";
import { Meter } from "../types";
import { displayError } from "@/components/display-message";
import { Additional, LoadOptions, OptionType } from "@/components/paginated-async-select";
import { GroupBase, OptionsOrGroups } from "react-select";

export type MeterOption = {
    value: string;
    label: string;
    meter: Meter;
}
export type MeterLoadOption = (inputValue: string, loadedOptions:OptionsOrGroups<OptionType, GroupBase<OptionType>>, additional: Additional | undefined,excludedMeterIds?: string[]) => ReturnType<LoadOptions<MeterOption>>;
const getMeterOptions: MeterLoadOption = async (inputValue: string, loadedOptions, additional,excludedMeterIds?: string[]) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const meters = await listMeters({
            search: inputValue,
            page,
            pageSize,
        });
        const options: MeterOption[] = meters.data.map(meter => ({
            value: meter.id,
            label: meter.meterNumber,
            meter: meter
        }));
        return {
            options: excludedMeterIds && excludedMeterIds.length? options.filter((mt)=> !excludedMeterIds.includes(mt.value)):options,
            hasMore: meters.hasMore,
            additional: {
                page: page + 1,
            },
        };
    } catch(error) {
        const message = getErrorMessage(error);
        displayError("Error fetching meter options", message);
        return {
            options: [],
            hasMore: false,
            additional: {
                page: page + 1,
            },
        };
    }
}

export const useMeterOptions = (excludedMeterIds?: string[]) => {
    const loadOptions: LoadOptions<MeterOption> = async (inputValue, loadedOptions, additional) => {
        return await getMeterOptions(inputValue, loadedOptions, additional,excludedMeterIds);
    };

    return {loadOptions};
}