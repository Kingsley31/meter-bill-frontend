import { getErrorMessage } from "@/lib/utils";
import { listMeters } from "../api/list-meter.api";
import { Meter } from "../types";
import { displayError } from "@/components/display-message";
import { LoadOptions } from "@/components/paginated-async-select";

export type MeterOption = {
    value: string;
    label: string;
    meter: Meter;
}

const getMeterOptions: LoadOptions = async (inputValue: string, loadedOptions, additional) => {
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
            options,
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

export const useMeterOptions = () => {
    const loadOptions: LoadOptions = async (inputValue, loadedOptions, additional) => {
        return await getMeterOptions(inputValue, loadedOptions, additional);
    };

    return {loadOptions};
}