import { ColumnDef } from "@tanstack/react-table";
import { MeterReading } from "../meter.types";
import { format } from "date-fns";

export const meterConsumptionColumns: ColumnDef<MeterReading>[] = [
  {
    accessorKey: "kwhConsumption",
    header: "Kwh Consumption",
    cell: ({ row }) => row.original.kwhConsumption,
  },
  {
    accessorKey: "readingDate",
    header: "Calculated Date",
    cell: ({ row }) => format(new Date(row.original.readingDate), "PPP"),
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date Entered",
  //   cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
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