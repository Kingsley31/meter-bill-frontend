import { ColumnDef } from "@tanstack/react-table";
import { MeterReading } from "../meter.types";
import { format } from "date-fns";
import { ImageIcon } from "lucide-react";

export const meterReadingColumns: ColumnDef<MeterReading>[] = [
  {
    accessorKey: "kwhReading",
    header: "Kwh Reading",
    cell: ({ row }) => row.original.kwhReading,
  },
  {
    accessorKey: "readingDate",
    header: "Reading Date",
    cell: ({ row }) => format(new Date(row.original.readingDate), "PPP"),
  },
  {
    accessorKey: "kwhConsumption",
    header: "Kwh Consumption",
    cell: ({ row }) => row.original.kwhConsumption,
  },
  {
    accessorKey: "meterImage",
    header: "Meter Image",
    cell: ({ row }) => <a href={row.original.meterImage} target="blank"><ImageIcon strokeWidth={1}/></a>,
  },
  {
    accessorKey: "createdAt",
    header: "Date Uploaded",
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
  },
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
  // {
  //   accessorKey: "currentKwhReading",
  //   header: "Current kWh",
  //   cell: ({ row }) => row.original.currentKwhReading ?? 0,
  // },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const meter = row.original
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem asChild>
  //             <Link href={routes.meters.path+'/'+meter.id}>Manage Details</Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
];