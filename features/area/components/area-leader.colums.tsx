import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { AreaLeader } from "../area.types";

export type GetAreaLeaderColumsProps = {
  refetch: () => void;
}

export function getAreaLeaderColumns({}: GetAreaLeaderColumsProps) {
  const areaLeaderColumns: ColumnDef<AreaLeader>[] = [
    {
      accessorKey: "leaderName",
      header: "Name",
      cell: ({ row }) => row.original.leaderName,
    },
    
    {
      accessorKey: "leaderEmail",
      header: "Email",
      cell: ({ row }) => row.original.leaderEmail,
    },
    {
      accessorKey: "leaderPhone",
      header: "Phone",
      cell: ({ row }) => row.original.leaderPhone? row.original.leaderPhone : "None",
    },
    {
        accessorKey: "createdAt",
        header: "Date Assigned",
        cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     const leaderArea = row.original
    //     return (
    //       <DeleteAreaLeaderDialog leaderArea={leaderArea} refetch={refetch}/>
    //     )
    //   },
    // },
  ];
  return areaLeaderColumns;
}
