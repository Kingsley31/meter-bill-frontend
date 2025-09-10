import { ColumnDef } from "@tanstack/react-table";
import { BillGenerationRequest } from "../bill.types";
import { format } from "date-fns";
import { BillGenerationRequestStatus } from "../bill.enums";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { routes } from "@/data/routes";

export const billGenerationRequestColumns: ColumnDef<BillGenerationRequest>[] = [
  {
    accessorKey: "requestId",
    header: "Request ID",
    cell: ({ row }) => (
      <span className="font-mono">{row.original.xRequestId}</span>
    ),
  },
  {
    accessorKey: "requestedByUserName",
    header: "Requested By",
    cell: ({ row }) => (
      <span className="font-mono">{row.original.requestedByUserName}</span>
    ),
  },
  {
    accessorKey: "areaName",
    header: "Area",
    cell: ({ row }) => row.original.areaName ?? "-",
  },
  {
    accessorKey: "scope",
    header: "Scope",
    cell: ({ row }) => row.original.scope ?? "-",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status == BillGenerationRequestStatus.SUCCESS
            ? "text-green-600 font-semibold"
            : row.original.status === BillGenerationRequestStatus.FAILED
            ? "text-red-600 font-semibold"
            : "text-yellow-600 font-semibold"
        }
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: "requestDate",
    header: "Requested At",
    cell: ({ row }) =>
      row.original.requestDate
        ? format(new Date(row.original.requestDate), "yyyy-MM-dd p")
        : "-",
  },
  {
    accessorKey: "completedDate",
    header: "Completed At",
    cell: ({ row }) =>
      row.original.completedDate
        ? format(new Date(row.original.completedDate), "yyyy-MM-dd p")
        : "-",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={routes.bills.path+'?requestId='+row.original.xRequestId}>View Bills</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
];