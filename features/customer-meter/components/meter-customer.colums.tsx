import { ColumnDef } from "@tanstack/react-table";
import { CustomerMeter } from "../customer-meter.types";
import { format } from "date-fns";
import { DeleteMeterCustomerDialog } from "./delete-meter-customer.dialog";

export type GetMeterCustomerColumsProps = {
  refetch: () => void;
}

export function getMeterCustomerColumns({refetch}: GetMeterCustomerColumsProps) {
  const meterColumns: ColumnDef<CustomerMeter>[] = [
    {
      accessorKey: "customerName",
      header: "Name",
      cell: ({ row }) => row.original.customerName,
    },
    
    {
      accessorKey: "customerEmail",
      header: "Email",
      cell: ({ row }) => row.original.customerEmail,
    },
    {
      accessorKey: "customerPhone",
      header: "Phone",
      cell: ({ row }) => row.original.customerPhone? row.original.customerPhone : "None",
    },
    {
        accessorKey: "createdAt",
        header: "Date Assigned",
        cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const customerMeter = row.original
        return (
          <DeleteMeterCustomerDialog customerMeter={customerMeter} refetch={refetch}/>
        )
      },
    },
  ];
  return meterColumns;
}
