import { getErrorMessage } from "@/lib/utils";
import { listLeaders } from "../api/list-leader.api";
import { Leader } from "../types";
import { displayError } from "@/components/display-message";
import { LoadOptions } from "@/components/paginated-async-select";

export type LeaderOption = {
    value: string;
    label: string;
    leader: Leader;
}

const getLeaderOptions: LoadOptions<LeaderOption> = async (inputValue: string, loadedOptions, additional) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const leaders = await listLeaders({
            search: inputValue,
            page,
            pageSize,
        });
        const options: LeaderOption[] = leaders.data.map(leader => ({
            value: leader.id,
            label: leader.name,
            leader: leader
        }));
        return {
            options,
            hasMore: leaders.hasMore,
            additional: {
                page: page + 1,
            },
        };
    } catch(error) {
        const message = getErrorMessage(error);
        displayError("Error fetching leader options", message);
        return {
            options: [],
            hasMore: false,
            additional: {
                page: page + 1,
            },
        };
    }
}

export const useLeaderOptions = () => {
    const loadOptions: LoadOptions<LeaderOption> = async (inputValue, loadedOptions, additional) => {
        return await getLeaderOptions(inputValue, loadedOptions, additional);
    };

    return {loadOptions};
}