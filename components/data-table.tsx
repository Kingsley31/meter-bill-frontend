"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertTriangle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

interface PaginationState {
  pageIndex: number; // zero-based
  pageSize: number;
  total: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  emptyMessage: string;
  loading?: boolean;
  skeletonRows?: number;
  pagination: PaginationState;
  setPagination?: (page: number, pageSize: number) => void,
  error?: unknown;
  onRetry?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = "No results.",
  loading = false,
  skeletonRows = 5,
  pagination,
  setPagination,
  error,
  onRetry,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [retrying, setRetrying] = useState(false);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(pagination.total / pagination.pageSize),
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  });

  // Update URL query params for pagination
  const setPage = (pageIndex: number, pageSize: number = pagination.pageSize) => {
    if (setPagination) {
      setPagination((pageIndex + 1),pageSize);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (pageIndex + 1).toString()); // 1-based for URL
    params.set("pageSize", pageSize.toString());
    router.replace(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  // Error UI
  if (error) {
    console.log(error);
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-2 py-16 mx-auto">
          <AlertTriangle className="h-8 w-8 text-red-500 mb-2" />
          <div className="text-base font-semibold text-red-700">Failed to load records</div>
          <div className="text-sm text-red-600 mb-2">
            {typeof error === "string"
              ? error
              : "There was an error retrieving the records. Please try again."}
          </div>
          <Button
            variant="destructive"
            onClick={async () => {
              setRetrying(true);
              if (onRetry) await onRetry();
              setRetrying(false);
            }}
            disabled={retrying}
          >
            {retrying ? "Retrying..." : "Retry"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      <div className="rounded-md border">
        <Table className="w-full table-auto overflow-scroll">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Skeleton loading rows
              Array.from({ length: skeletonRows }).map((_, idx) => (
                <TableRow key={`skeleton-row-${idx}`}>
                  {columns.map((_, colIdx) => (
                    <TableCell key={`skeleton-cell-${colIdx}`}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="hidden md:block text-muted-foreground flex-1 text-sm">
          {loading
            ? "Loading..."
            : `${data.length} of ${pagination.total} row(s) retrieved.`}
        </div>
        <div className="space-x-2 flex items-center">
          <Label htmlFor="rows-per-page" className="text-xs text-muted-foreground">
            Rows per page
          </Label>
          <Select
                defaultValue={`${pagination.pageSize}`}
                onValueChange={(value) => {
                   setPage(pagination.pageIndex,Number(value));
                }}
              >
            <SelectTrigger size="sm" id="rows-per-page">
              <SelectValue
                placeholder={pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent side="top">
              {[5,10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(0, pagination.pageIndex - 1))}
            disabled={pagination.pageIndex === 0 || loading}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {pagination.pageIndex + 1} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages - 1, pagination.pageIndex + 1))}
            disabled={pagination.pageIndex + 1 >= totalPages || loading}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
        </div>
      </div>
    </div>
  )
}