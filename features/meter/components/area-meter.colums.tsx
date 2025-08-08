import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { routes } from "@/data/routes";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Meter } from "@/shared/meter/types";
import { CreateMeterReadingForm, MeterReadingFormTriggerType } from "./meter-reading.form";
import { MeterType } from "@/shared/meter/enums";

export type GetAreaMetersColumsProps = {
  refetch: () => void;
}

export function getAreaMeterColumns({refetch}: GetAreaMetersColumsProps) {
  const meterColumns: ColumnDef<Meter>[] = [
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
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <Badge variant="outline" className="text-muted-foreground px-1.5">{row.original.type}</Badge>,
    },
    {
      accessorKey: "ctMultiplierFactor",
      header: "Multiplier",
      cell: ({ row }) => row.original.ctMultiplierFactor,
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
      cell: ({ row }) => row.original.purpose,
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
      accessorKey: "currentKwhReading",
      header: "Reading kWh",
      cell: ({ row }) =>  row.original.type == MeterType.DERIVED ? "N/A" : row.original.currentKwhReading ?? 0,
    },
    {
      accessorKey: "currentKwhConsumption",
      header: "Consumption kWh",
      cell: ({ row }) => row.original.currentKwhConsumption ?? 0,
    },
    {
      id: "actions",
      header: "Actions",
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
            <DropdownMenuContent className="px-2" align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Button variant="ghost" asChild><Link href={routes.meters.path+'/'+meter.id}>View Details</Link></Button>
              </DropdownMenuItem>
              {(meter.type == MeterType.MEASUREMENT && meter.isActive) &&(<DropdownMenuItem asChild><CreateMeterReadingForm triggerType={MeterReadingFormTriggerType.MENU} meter={meter} refetch={refetch}/></DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];
  return meterColumns;
}
