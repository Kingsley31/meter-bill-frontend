import { getErrorMessage } from "@/lib/utils";
import { listCustomers } from "../api/list-customer.api";
import { Customer } from "../types";
import { displayError } from "@/components/display-message";
import { LoadOptions } from "@/components/paginated-async-select";

export type CustomerOption = {
    value: string;
    label: string;
    customer: Customer;
}

const getCustomerOptions: LoadOptions = async (inputValue: string, loadedOptions, additional) => {
    const page = additional?.page ?? 1;
    const pageSize = 10;
    try {
        const customers = await listCustomers({
            search: inputValue,
            page,
            pageSize,
        });
        const options: CustomerOption[] = customers.data.map(customer => ({
            value: customer.id,
            label: customer.name,
            customer: customer
        }));
        return {
            options,
            hasMore: customers.hasMore,
            additional: {
                page: page + 1,
            },
        };
    } catch(error) {
        const message = getErrorMessage(error);
        displayError("Error fetching customer options", message);
        return {
            options: [],
            hasMore: false,
            additional: {
                page: page + 1,
            },
        };
    }
}

export const useCustomerOptions = () => {
    const loadOptions: LoadOptions = async (inputValue, loadedOptions, additional) => {
        return await getCustomerOptions(inputValue, loadedOptions, additional);
    };

    return {loadOptions};
}