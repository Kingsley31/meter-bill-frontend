import { useMutation } from "@tanstack/react-query"
import { assignMeterAreaApi, AssignMeterAreaApiProps } from "../api/assign-meter-area.api";


export function useAssignMeterArea() {
    return useMutation<boolean,unknown,AssignMeterAreaApiProps>({
        mutationFn: (payload) => assignMeterAreaApi(payload),
    });
}