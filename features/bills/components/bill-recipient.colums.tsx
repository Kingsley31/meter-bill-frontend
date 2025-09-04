import { ColumnDef } from "@tanstack/react-table";
import { BillRecipient } from "../bill.types";


export const billRecipientColumns: ColumnDef<BillRecipient>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
    cell: ({ row }) => row.original.phoneNumber,
  },
  {
    accessorKey: "billSent",
    header: "Bill Sent",
    cell: ({ row }) => row.original.billSent ? "Yes" : "No",
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date Set",
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