"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import PaginatedAsyncSelect, { OptionType } from "@/components/paginated-async-select";
import { MeterPurpose, MeterType } from "@/shared/meter/enums";
import { useAreaOptions } from "@/shared/area/hooks/use-area-options.hook";

export type MeterFilterValues = {
  search?: string;
  areaId?: string;
  type?: MeterType;
  purpose?: MeterPurpose;
  pageSize?: string;
};

export function FilterMeter() {
  // Example options, replace with your actual options or fetch from context/store
 const { loadOptions: loadAreaOptions} = useAreaOptions();

  const { register, handleSubmit, reset, control } = useForm<MeterFilterValues>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (values: MeterFilterValues) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    // Keep existing params that are not in the form
    searchParams.forEach((v, k) => {
      if (!params.has(k)) params.set(k, v);
    });
    router.replace(`?${params.toString()}`);
    setOpen(false);
  };

  const handleReset = () => {
    reset();
    router.replace("?");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-center">
          <p className="text-xs font-medium">Filter:&nbsp;&nbsp;</p>
          <Button
            variant="outline"
            size="icon"
            aria-label="Filter"
            className="border-accent shadow-sm"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-sm max-w-full p-6 rounded-xl shadow-lg border bg-white" align="start">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">Search</label>
            <div className="relative">
              <Input
                {...register("search")}
                placeholder="Search by meter number, customer, location"
                className={clsx(
                  "w-full pl-10 focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300",
                  "focus:border-primary focus-visible:border-primary"
                )}
                style={{ boxShadow: "none" }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">Area</label>
              <Controller
                control={control}
                name="areaId"
                render={({ field }) => (
                  <PaginatedAsyncSelect
                      loadOptions={loadAreaOptions}
                      setFormValue={(option: OptionType | null) => {
                          field.onChange(option?.value)
                          // setAreaName(option?.label || "")
                      }}
                      placeholder="Select area"
                  />
                )}
              />
            </div>
          </div>
          {/* Type and Purpose in one column */}
          <div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted-foreground">Type</label>
                <Controller
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={MeterType.DERIVED}>Derived</SelectItem>
                        <SelectItem value={MeterType.MEASUREMENT}>Measurement</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted-foreground">Purpose</label>
                <Controller
                  control={control}
                  name="purpose"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 border-gray-300">
                        <SelectValue placeholder="Purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={MeterPurpose.CONSUMER}>Consumer</SelectItem>
                        <SelectItem value={MeterPurpose.AUDIT}>Audit</SelectItem>
                        <SelectItem value={MeterPurpose.BULK}>Bulk</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1 text-muted-foreground">Total Records</label>
                <Controller
                  control={control}
                  name="pageSize"
                  render={({ field }) => (
                     <Input type="number" placeholder="Total Records" {...field} value={field.value ?? ""}/>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-md"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button type="submit" variant="default" className="rounded-md">
              Filter
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}