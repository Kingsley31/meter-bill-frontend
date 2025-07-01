import { displayError } from "@/components/display-message";
import { LoadOptions } from "@/components/paginated-async-select";
import { ResourceType } from "@/enums/resuorce-type";
import { listMeters } from "@/features/meter/api/list-meter.api";
import { getErrorMessage } from "@/lib/utils";


const getMeterOptions: LoadOptions = async (inputValue: string, loadedOptions, additional) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const meters = await listMeters({
            search: inputValue,
            page,
            pageSize,
        });
        const options = meters.data.map(meter => ({
            value: meter.id,
            label: meter.meterNumber,
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

const getAreaOptions: LoadOptions = async (inputValue, loadedOptions, additional) => {
    const page = additional?.page ?? 1;
    const areaOptions = [
        { id: "d7a9e2e1-8c2d-4e3a-9c2d-1e2a3b4c5d6f", name: "Lagos Mainland" },
        { id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d", name: "Ikeja" },
    ];
    const filteredAreas = areaOptions.filter(area =>
        area.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const options = filteredAreas.map(area => ({
        value: area.id,
        label: area.name,
    }));
    return {
        options,
        hasMore: false,
        additional: {
            page: page + 1,
        },
    };
}
export const useResourceOptions = (resurceType: ResourceType) => {
    const loadOptions: LoadOptions = async (inputValue, loadedOptions, additional) => {
        switch (resurceType) {
            case ResourceType.AREA:
                return await getAreaOptions(inputValue, loadedOptions, additional);
            case ResourceType.METER:
                return await getMeterOptions(inputValue, loadedOptions, additional);
            default:
                throw new Error(`Unsupported resource type: ${resurceType}`);
        }
    };

    return {loadOptions};
}