"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { displayError } from "@/components/display-message";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import PaginatedAsyncSelect, { OptionType } from "@/components/paginated-async-select";
import { useAreaOptions } from "@/shared/area/hooks/use-area-options.hook";
import { subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getErrorMessage } from "@/lib/utils";
import { useGenerateLeadersBill } from "../hooks/use-generate-leader-bill.hook";
import { useEffect, useState } from "react";
import { BillGenerationProgressDialog } from "./bill-generation-progress.dialog";

type GenerateLeadersBillFormValues = {
  areaId: string;
  areaName: string;
  startDate: Date;
  endDate: Date;
};



export function GenerateLeadersBill() {
  const [isOpen, setIsOpen] = useState(false);
  const [statusDialogTitle, setStatusDialogTitle] = useState('');
  const [statusDialogDescription, setStatusDialogDescription] = useState('');
  const [requestId, setRequestId] = useState('');
  const handleClose = () => setIsOpen(false);
  const [isClient, setIsClient] = useState(false);
      useEffect(() => {
          setIsClient(true);
      }, []);
  const form = useForm<GenerateLeadersBillFormValues>({
    defaultValues: {
      areaId: "",
      areaName: "",
      startDate: subDays(new Date(), 30),
      endDate: new Date(),
    },
  });

  const { loadOptions } = useAreaOptions();
  const generateLeadersBillMutation = useGenerateLeadersBill();

  const onSubmit = async (values: GenerateLeadersBillFormValues) => {
    generateLeadersBillMutation.mutate(
      { ...values },
      {
        onSuccess: (data) => {
          setStatusDialogTitle("Bills generation request successful");
          setStatusDialogDescription("The area leaders bill generation has been requested successfully.");
          setRequestId(data.xRequestId);
          setIsOpen(true);
          form.reset();
        },
        onError: (error: unknown) => {
          const message = getErrorMessage(error);
          displayError("Failed to generate bills", message);
        },
      }
    );
  };

  return (
    <Card className="p-2 md:p-8">
      <CardHeader>
          <CardTitle>Generate Area Leaders Bill</CardTitle>
          <CardDescription>
            Generate consolidated bill for all leaders in a specific area within a selected date range.
          </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="areaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    {isClient ? (
                    <PaginatedAsyncSelect
                      loadOptions={loadOptions}
                      setFormValue={(option: OptionType | null) => {
                        field.onChange(option?.value || "");
                        form.setValue("areaName", option?.label || "");
                      }}
                      placeholder="Select area"
                    />
                    ) : (
                        <div className="h-10 bg-muted rounded" />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row md:justify-between">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                disabled={generateLeadersBillMutation.status === "pending"}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" disabled={generateLeadersBillMutation.status=="pending"}>
                {generateLeadersBillMutation.status=="pending" ? "Generating..." : "Generate"}
              </Button>
            </div>
          </form>
        </Form>
         <BillGenerationProgressDialog title={statusDialogTitle} description={statusDialogDescription} xRequestId={requestId} isOpen={isOpen} onClose={handleClose} />
      </CardContent>
    </Card>
  );
}