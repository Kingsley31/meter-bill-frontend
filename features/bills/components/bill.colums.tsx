import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ReceiptText } from "lucide-react";
import { routes } from "@/data/routes";
import Link from "next/link";
import { Bill } from "../bill.types";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export type GetAllBillsColumsProps = {
  refetch: () => void;
}

export function getAllBillColumns({}: GetAllBillsColumsProps) {
  const meterColumns: ColumnDef<Bill>[] = [
    {
      accessorKey: "invoiceNumber",
      header: "Invoice No",
      cell: ({ row }) => row.original.invoiceNumber,
    },
    {
      accessorKey: "requestId",
      header: "Request ID",
      cell: ({ row }) => row.original.requestId,
    },
    {
      accessorKey: "totalAmountDue",
      header: "Total Amount(₦)",
      cell: ({ row }) => row.original.totalAmountDue.toLocaleString(),
    },
    {
      accessorKey: "areaName",
      header: "Area Name",
      cell: ({ row }) => row.original.areaName ?? '-',
    },
    {
      accessorKey: "pdfUrl",
      header: "PDF Link",
      cell: ({ row }) => row.original.pdfUrl ?<Link className="text-primary underline font-bold text-xs" target="blank" href={row.original.pdfUrl}><span>Link</span></Link> : "-",
    },
    {
      accessorKey: "isConsolidated",
      header: "Consolidated",
      cell: ({ row }) => row.original.isConsolidated ? "Yes" : "No",
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => row.original.isConsolidated? "-":<Badge variant={row.original.paymentStatus === 'paid' ? 'default' : row.original.paymentStatus === 'pending' ? 'secondary' : 'default'}>{row.original.paymentStatus}</Badge>,
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
      cell: ({ row }) => format(new Date(row.original.startDate), "PPP"),
    },
    {
      accessorKey: "endDate",
      header: "End Date",
      cell: ({ row }) => format(new Date(row.original.endDate), "PPP"),
    },
    {
      accessorKey: "createdAt",
      header: "Date Generated",
      cell: ({ row }) => format(new Date(row.original.createdAt), "PPP"),
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
                <Button variant="ghost" asChild><Link href={routes.bills.path+'/'+area.id}><ReceiptText />View Details</Link></Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ];
  return meterColumns;
}
