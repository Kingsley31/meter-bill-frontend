import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { BillBreakdown } from "../bill.types";


export const billBreakdownColumns: ColumnDef<BillBreakdown>[] = [
  {
    accessorKey: "meterNumber",
    header: "Meter Number",
    cell: ({ row }) => row.original.meterNumber,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => row.original.location,
  },
  {
    accessorKey: "areaName",
    header: "Area",
    cell: ({ row }) => row.original.areaName,
  },
  {
    accessorKey: "lastReadDate",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.lastReadDate), "PPP"),
  },
  {
    accessorKey: "firstReadKwh",
    header: "Initial kWh",
    cell: ({ row }) => row.original.firstReadKwh,
  },
  {
    accessorKey: "lastReadKwh",
    header: "Final kWh",
    cell: ({ row }) => row.original.lastReadKwh,
  },
  {
    accessorKey: "totalConsumption",
    header: "Total Consumption (kWh)",
    cell: ({ row }) => row.original.totalConsumption,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount (₦)",
    cell: ({ row }) => Number(row.original.totalAmount).toLocaleString(),
  },
  {
    accessorKey: "tariff",
    header: "Tariff (₦)",
    cell: ({ row }) => row.original.tariff,
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
  //     const bill = row.original
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
  //             <Link href={routes.bills.path+'/'+bill.id}>Manage Details</Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
];