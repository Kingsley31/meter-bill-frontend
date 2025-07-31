import { ColumnDef } from "@tanstack/react-table";
import { MeterReading } from "../meter.types";
import { format } from "date-fns";
import { ImageIcon, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteMeterReadingDialog } from "./delete-meter-reading.dialog";

export type GetMeterReadingColumsProps = {
  refetch: () => void;
}

export function getMeterReadingColumns({ refetch }: GetMeterReadingColumsProps): ColumnDef<MeterReading>[] {
  const meterReadingColumns: ColumnDef<MeterReading>[] = [
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
    header: "Date Entered",
    cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const meterReading = row.original;
      const todayDate = new Date();
      const readingEnteryDate = new Date(meterReading.createdAt);
      const canDeleteReading = todayDate.getDate() === readingEnteryDate.getDate();
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
              <DeleteMeterReadingDialog reading={meterReading} refetch={refetch} disabled={!canDeleteReading}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
];
  return meterReadingColumns;
}
