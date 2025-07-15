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
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover as ShadPopover } from "@/components/ui/popover"; // alias to avoid conflict
import { MeterPurpose, MeterType } from "@/shared/meter/enums";
import { useAreaOptions } from "@/shared/area/hooks/use-area-options.hook";

export type UnreadMeterFilterValues = {
  search?: string;
  areaId?: string;
  type?: MeterType;
  purpose?: MeterPurpose;
  startDate?: string;
  endDate?: string;
  pageSize?: string;
};

export type FilterUnreadMeterProps = {
  defaultStartDate: string;
  defaultEndDate: string;
}

export function FilterUnreadMeter({defaultStartDate, defaultEndDate}: FilterUnreadMeterProps) {
  const { loadOptions: loadAreaOptions } = useAreaOptions();

  const { register, handleSubmit, reset, control } = useForm<UnreadMeterFilterValues>();
  const [open, setOpen] = useState(false);
  const [ startCalenderOpen, setStartCalenderOpen]= useState(false);
  const [ endCalenderOpen, setEndCalenderOpen]= useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (values: UnreadMeterFilterValues) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
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
                      field.onChange(option?.value);
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
            </div>
          </div>
          {/* Start Date and End Date */}
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">Start Date</label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <ShadPopover open={startCalenderOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={clsx(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}

                        onClick={()=> setStartCalenderOpen(true)}
                      >
                        {field.value
                          ? format(new Date(field.value), "PPP")
                          : defaultStartDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : new Date(defaultStartDate)}
                        onSelect={(date: Date | undefined) => {
                          field.onChange(date ? date.toISOString(): "");
                          setStartCalenderOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </ShadPopover>
                )}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">End Date</label>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <ShadPopover open={endCalenderOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={clsx(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}

                        onClick={()=> setEndCalenderOpen(true)}
                      >
                        {field.value
                          ? format(new Date(field.value), "PPP")
                          : defaultEndDate}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : new Date(defaultEndDate)}
                        onSelect={(date: Date | undefined) => {
                          field.onChange(date ? date.toISOString(): "");
                          setEndCalenderOpen(false);
                        }}
                        autoFocus
                      />
                    </PopoverContent>
                  </ShadPopover>
                )}
              />
            </div>
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