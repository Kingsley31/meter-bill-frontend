"use client";

import { useForm, Controller } from "react-hook-form";
import { ListBillGenerationRequestFilter } from "../api/list-bill-generation-request.api";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { Filter } from "lucide-react";

export function FilterBillGenerationRequests() {
  const { register, handleSubmit, reset, control } = useForm<ListBillGenerationRequestFilter>();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = (values: ListBillGenerationRequestFilter) => {
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
        <Button variant="outline" size="sm">
          <span className="flex items-center"><Filter className="w-5 h-5" /> &nbsp;Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-4" align="center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-xs font-semibold mb-1 text-muted-foreground">Request ID</label>
            <Input {...register("xRequestId")} placeholder="Request ID" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">Start Date</label>
              <Controller
                control={control}
                name="requestDateStart"
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
                name="requestDateEnd"
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
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" variant="default">
              Filter
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}