"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

export type BillFilter = {
  generatedStartDate?: Date;
  generatedEndDate?: Date;
  search?: string;
  isConsolidated?: boolean;
  scope?: "area-wide" | "system-wide";
};

export function FilterBill() {
  const { register, handleSubmit, reset, control } = useForm<BillFilter>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (values: BillFilter) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (value instanceof Date) {
          params.set(key, format(value, "yyyy-MM-dd"));
        } else {
          params.set(key, value.toString());
        }
      }
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
        <Button variant="outline" size="sm"><span className="flex items-center"><Filter className="w-5 h-5" /> &nbsp;Filter</span></Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-4" align="start">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">Search</label>
            <Input {...register("search")} placeholder="Search by invoice or request ID or recipient name" />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">Scope</label>
            <Controller
              control={control}
              name="scope"
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area-wide">Area Wide</SelectItem>
                    <SelectItem value="system-wide">System Wide</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">Consolidated</label>
            <Controller
              control={control}
              name="isConsolidated"
              render={({ field }) => (
                <Select value={field.value === undefined ? "" : field.value ? "true" : "false"} onValueChange={val => field.onChange(val === "true")}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">Start Date</label>
              <Controller
                control={control}
                name="generatedStartDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left font-normal">
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={date => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">End Date</label>
              <Controller
                control={control}
                name="generatedEndDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full text-left font-normal">
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={date => field.onChange(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={handleReset}>Reset</Button>
            <Button type="submit" variant="default">Filter</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}