"use client";

import { DataTable } from "@/components/data-table";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { getAllAreaColumns } from "./area.colums";
import { Label } from "@/components/ui/label";
import { useListArea } from "@/shared/area/hooks/use-list-area.hook";
import { ListAreaFilters } from "@/shared/area/api/list-area.api";
import { useState } from "react";
import { SidebarInput } from "@/components/ui/sidebar";
import { Search } from "lucide-react";


export function AllAreasTable() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 5);
  const [search, setSearch] = useState("");
  const [typedIn, setTypeIn] = useState("");

  const filters: ListAreaFilters = {
    page,
    pageSize,
    ...(search && { search: search }),
  };

  searchParams.forEach((value, key) => {
    if (key === "search" ) {
      (filters as Record<string, unknown>)[key] = value;
    }
  });

  let timerId: ReturnType<typeof setTimeout> | undefined;
  const onSearchAreas = () => {
    if (typedIn.trim().length> 1) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(function(){
        setSearch(typedIn);
     }, 2000);
    }else {
      if (search.trim().length> 0) {
        setSearch("");
      }
    }

  }

  const { data, isLoading, error, refetch } = useListArea(filters);

  return (
    <Card className="w-full max-w-screen mx-auto">
      <CardHeader>
        <CardTitle>Manage Areas</CardTitle>
        <CardDescription>
          View, filter, and manage all areas in the system.
        </CardDescription>
        <CardAction>
          <div className="flex flex-row">
            <Label className="mr-2 text-sm">Search:</Label>
            <div className="relative">
              <SidebarInput
                placeholder="search by name, city, state or country..." 
                onKeyUp={onSearchAreas}
                value={typedIn ?? ""}
                onChange={(e) => setTypeIn(e.target.value)} 
                className="pl-8"
              />
              <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
            </div>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={getAllAreaColumns({refetch})}
          data={data?.data || []}
          emptyMessage="No areas found."
          loading={isLoading}
          skeletonRows={5}
          pagination={{
            pageIndex: page - 1,
            pageSize,
            total: data?.total || 0,
          }}
          error={error}
          onRetry={refetch}
        />
      </CardContent>
    </Card>
  );
}