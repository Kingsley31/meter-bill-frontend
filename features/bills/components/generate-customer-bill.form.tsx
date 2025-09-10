"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import PaginatedAsyncSelect, { OptionType } from "@/components/paginated-async-select";
import { Calendar } from "@/components/ui/calendar";
import { subDays } from "date-fns";
import { displayError } from "@/components/display-message";
import { useCustomerOptions } from "@/shared/customer/hooks/use-customer-options.hook";
import { useGenerateCustomerBill } from "../hooks/use-generate-customer-bill.hook";
import { getErrorMessage } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { BillGenerationProgressDialog } from "./bill-generation-progress.dialog";

type GenerateCustomerBillFormValues = {
  recipientId: string;
  startDate: Date;
  endDate: Date;
};


export function GenerateCustomerBill() {
  const [isOpen, setIsOpen] = useState(false);
    const [statusDialogTitle, setStatusDialogTitle] = useState('');
    const [statusDialogDescription, setStatusDialogDescription] = useState('');
    const [requestId, setRequestId] = useState('');
    const handleClose = () => setIsOpen(false);
  const [isClient, setIsClient] = useState(false);
      useEffect(() => {
          setIsClient(true);
      }, []);
  const form = useForm<GenerateCustomerBillFormValues>({
    defaultValues: {
      recipientId: "",
      startDate: subDays(new Date(), 30),
      endDate: new Date(),
    },
  });

  const { loadOptions } = useCustomerOptions();

    const generateCustomerBillMutation = useGenerateCustomerBill();
  
    const onSubmit = async (values: GenerateCustomerBillFormValues) => {
      generateCustomerBillMutation.mutate(
        { ...values },
        {
          onSuccess: (data) => {
            setStatusDialogTitle("Bills generation request successful");
            setStatusDialogDescription("The customer bill generation has been requested successfully.");
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
          <CardTitle>Generate Customer Bill</CardTitle>
          <CardDescription>
            Generate consolidated bill for all the meters linked to a customer within a selected date range.
          </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="recipientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <FormControl>
                    {isClient ? (
                    <PaginatedAsyncSelect
                      loadOptions={loadOptions}
                      setFormValue={(option: OptionType | null) => {
                        field.onChange(option?.value || "");
                      }}
                      placeholder="Select customer"
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
                        onSelect={date => field.onChange(date)}
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
                        onSelect={date => field.onChange(date)}
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
                disabled={generateCustomerBillMutation.status === "pending"}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" disabled={generateCustomerBillMutation.status=="pending"}>
                {generateCustomerBillMutation.status == "pending" ? "Generating..." : "Generate"}
              </Button>
            </div>
          </form>
        </Form>
        <BillGenerationProgressDialog title={statusDialogTitle} description={statusDialogDescription} xRequestId={requestId} isOpen={isOpen} onClose={handleClose} />
      </CardContent>
    </Card>
  );
}