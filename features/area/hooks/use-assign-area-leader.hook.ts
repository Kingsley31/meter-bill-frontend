import { useMutation } from "@tanstack/react-query";
import { assignAreaLeader, AssignAreaLeaderProps } from "../api/assign-area-leader.api";


export function useAssignAreaLeader() {
  return useMutation<boolean, unknown, AssignAreaLeaderProps>({
    mutationFn: (payload) => assignAreaLeader(payload),
  });
}