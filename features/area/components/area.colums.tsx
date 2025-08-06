import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ReceiptText } from "lucide-react";
import { routes } from "@/data/routes";
import Link from "next/link";
import { Area } from "@/shared/area/types";

export type GetAllAreasColumsProps = {
  refetch: () => void;
}

export function getAllAreaColumns({}: GetAllAreasColumsProps) {
  const meterColumns: ColumnDef<Area>[] = [
    {
      accessorKey: "areaName",
      header: "Area Name",
      cell: ({ row }) => row.original.areaName,
    },
    {
      accessorKey: "totalMeters",
      header: "Total Meters",
      cell: ({ row }) => row.original.totalMeters ?? 0,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => row.original.city,
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => row.original.state,
    },
    {
      accessorKey: "country",
      header: "Country",
      cell: ({ row }) => row.original.country,
    },
    // {
    //   accessorKey: "address",
    //   header: "Address",
    //   cell: ({ row }) => row.original.address,
    // },
    // {
    //   accessorKey: "isActive",
    //   header: "Active",
    //   cell: ({ row }) => (
    //     <span
    //       className={
    //         row.original.isActive
    //           ? "text-green-600 font-medium text-sm"
    //           : "text-red-500 font-medium text-sm"
    //       }
    //     >
    //       {row.original.isActive ? "Yes" : "No"}
    //     </span>
    //   ),
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const area = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-2" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button variant="ghost" asChild><Link href={routes.areas.path+'/'+area.id}><ReceiptText />Manage Details</Link></Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];
  return meterColumns;
}
