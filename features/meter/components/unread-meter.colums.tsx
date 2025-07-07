import { ColumnDef } from "@tanstack/react-table";
import { Meter } from "../meter.types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { routes } from "@/data/routes";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const unreadMeterColumns: ColumnDef<Meter>[] = [
  {
    accessorKey: "meterNumber",
    header: "Meter Number",
    cell: ({ row }) => row.original.meterNumber,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">{row.original.type}</Badge>,
  },
  {
    accessorKey: "ctMultiplierFactor",
    header: "CT Multiplier",
    cell: ({ row }) => row.original.ctMultiplierFactor,
  },
  {
    accessorKey: "currentKwhReadingDate",
    header: "Last Read",
    cell: ({ row }) => row.original.currentKwhReadingDate ? format(new Date(row.original.currentKwhReadingDate), "dd MMM yyyy") : "N/A",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (
      <span
        className={
          row.original.isActive
            ? "text-green-600 font-medium text-sm"
            : "text-red-500 font-medium text-sm"
        }
      >
        {row.original.isActive ? "Yes" : "No"}
      </span>
    ),
  },
  {
    accessorKey: "purpose",
    header: "Purpose",
    cell: ({ row }) => row.original.purpose,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const meter = row.original
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
              <Link href={routes.meters.path+'/'+meter.id}>Manage Details</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];