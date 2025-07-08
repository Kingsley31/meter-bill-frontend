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
import { cn } from "@/lib/utils"
import { Meter } from "../meter.types"

const formSchema = z.object({
  customerId: z.string().min(1, "Please select a customer."),
})

type AssignCustomerFormValues = z.infer<typeof formSchema>

type Customer = {
  id: string
  name: string
  email: string
  address?: string
}

const mockCustomers: Customer[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `cust-${i + 1}`,
  name: `Customer ${i + 1}`,
  email: `cust${i + 1}@email.com`,
  address: `Block ${i + 1}, Utility Rd.`,
}))

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

  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const perPage = 5

  const filteredCustomers = mockCustomers.filter((cust) =>
    `${cust.name} ${cust.email} ${cust.address}`
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  const paginatedCustomers = filteredCustomers.slice(
    (page - 1) * perPage,
    page * perPage
  )

  const hasNextPage = page * perPage < filteredCustomers.length

  const handleSubmit = (data: AssignCustomerFormValues) => {
    console.log("Assigned Customer:", data)
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
                  <FormLabel>Select Customer</FormLabel>
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
                        {paginatedCustomers.length > 0 ? (
                          paginatedCustomers.map((cust) => (
                            <div
                              key={cust.id}
                              className={cn(
                                "p-2 rounded-md cursor-pointer hover:bg-muted transition-colors",
                                field.value === cust.id && "bg-primary/10"
                              )}
                              onClick={() => field.onChange(cust.id)}
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
                          <div className="p-2 text-muted-foreground text-sm">
                            No customers found.
                          </div>
                        )}
                      </ScrollArea>

                      <div className="flex justify-between pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(p - 1, 1))}
                          disabled={page === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => p + 1)}
                          disabled={!hasNextPage}
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
          <CardFooter className="justify-end mt-6 border-t">
            <Button type="submit" disabled={!form.watch("customerId")}>
              Assign Customer
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

