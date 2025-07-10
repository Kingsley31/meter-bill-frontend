"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, getErrorMessage } from "@/lib/utils"
import { Meter } from "@/shared/meter/types"
import { useListCustomer } from "@/shared/customer/hooks/use-list-customer.hook"
import { useAssignMeterCustomer } from "../hooks/use-assign-meter-customer.hook"
import { toast } from "sonner"
import { displayError, displaySuccess } from "@/components/display-message"

const formSchema = z.object({
  customerId: z.string().min(1, "Please select a customer."),
})

type AssignCustomerFormValues = z.infer<typeof formSchema>





export type AssignMeterCustomerProps = {
    meter: Meter;
    refetch: () => void;
}

export function AssignMeterCustomer({ meter, refetch}: AssignMeterCustomerProps) {
  const form = useForm<AssignCustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: "",
    },
  })

  const [customerName, setCustomerName] = useState("");
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const pageSize = 5

  const { data, isLoading, isError, refetch: refetchCustomers } = useListCustomer({search: query, page: page, pageSize: pageSize});

  const assignCustomerMutation = useAssignMeterCustomer();



  const handleSubmit = (data: AssignCustomerFormValues) => {
        if (data.customerId == meter.customerId) {
            toast.error('Meter is already assigned to this customer')
            return;
        }
        assignCustomerMutation.mutate({customerId: data.customerId, custmerName: customerName, meterId: meter.id}, {
            onSuccess: () => {
                displaySuccess("Meter Assigned successfully", `Meter ${meter.meterNumber} has been assigned to ${customerName}.`);
                form.reset();
                refetch();
            },
            onError: (error: unknown) => {
                const message = getErrorMessage(error);
                displayError("Failed to assign meter to customer", message);
            }
        });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Customer to Meter</CardTitle>
        <CardDescription>
          Search and select a customer to assign to this meter.
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Customer</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        placeholder="Search by name, email, or address"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value)
                          setPage(1)
                        }}
                      />

                      <ScrollArea className="h-64 border rounded-md p-1">
                        {isLoading ? (
                          <div className="p-2 text-sm text-muted-foreground">
                            Loading customers...
                          </div>
                        ) : isError ? (
                          <div className="p-2 text-red-500 text-sm">
                            Failed to load customers. <span className="font-bold cursor-pointer" onClick={()=> refetchCustomers()}><u>reload</u></span>
                          </div>
                        ) : data && data.data.length > 0 ? (
                          data.data.map((cust) => (
                            <div
                              key={cust.id}
                              className={cn(
                                "p-2 rounded-md cursor-pointer hover:bg-muted transition-colors",
                                field.value === cust.id && "bg-primary/10"
                              )}
                              onClick={() => {field.onChange(cust.id); setCustomerName(cust.name);}}
                            >
                              <div className="font-medium">{cust.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {cust.email}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {cust.address}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">
                            No customers found.
                          </div>
                        )}
                      </ScrollArea>

                      <div className="flex justify-between pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => p + 1)}
                          disabled={!data?.hasMore}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-between items-center mt-6">
            <Button 
                variant="outline" 
                disabled={form.formState.isSubmitting || assignCustomerMutation.isPending}
                onClick={()=> form.reset() }>
                Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !form.watch("customerId") || assignCustomerMutation.isPending
              }
            >
              {assignCustomerMutation.isPending ? "Assigning..." : "Assign Customer"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

