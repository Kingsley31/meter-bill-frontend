"use client"


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
import { Area } from "@/shared/area/types"
import { displayError, displaySuccess } from "@/components/display-message"
import { Leader } from "@/shared/leader/types"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAssignAreaLeader } from "../hooks/use-assign-area-leader.hook"
import { useListLeader } from "@/shared/leader/hooks/use-list-leader.hook"

const formSchema = z.object({
  leaderId: z.string().min(1, "Please select a leader."),
})

type AssignLeaderFormValues = z.infer<typeof formSchema>





export type AssignAreaLeaderProps = {
    area: Area;
    refetch: () => void;
}

export function AssignAreaLeader({ area, refetch}: AssignAreaLeaderProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<AssignLeaderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leaderId: "",
    },
  })


  const [leader, setLeader] = useState<Leader>();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError, refetch: refetchLeaders } = useListLeader({search: query, page: page, pageSize: pageSize});

  const assignLeaderMutation = useAssignAreaLeader();



  const handleSubmit = (data: AssignLeaderFormValues) => {
        assignLeaderMutation.mutate({
          leaderId: data.leaderId,
          leaderName: leader!.name,
          leaderEmail: leader!.email,
          areaId: area.id,
          leaderPhone: leader?.phone,
          areaName: area.areaName
        }, {
            onSuccess: () => {
                displaySuccess("Area Assigned successfully", `Area ${area.areaName} has been assigned to ${leader?.name}.`);
                form.reset();
                refetch();
                setOpen(false);
            },
            onError: (error: unknown) => {
                const message = getErrorMessage(error);
                displayError("Failed to assign area to leader", message);
            }
        });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button variant="default">Assign Leader</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>Assign Leader to Area</DialogTitle>
        <DialogDescription>
          Search and select a leader to assign to this area.
          <br />
          Area: <span className="font-medium">{area.areaName}</span>
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="leaderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Leader</FormLabel>
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
                            Loading leaders...
                          </div>
                        ) : isError ? (
                          <div className="p-2 text-red-500 text-sm">
                            Failed to load leaders. <span className="font-bold cursor-pointer" onClick={()=> refetchLeaders()}><u>reload</u></span>
                          </div>
                        ) : data && data.data.length > 0 ? (
                          data.data.map((lead) => (
                            <div
                              key={lead.id}
                              className={cn(
                                "p-2 rounded-md cursor-pointer hover:bg-muted transition-colors",
                                field.value === lead.id && "bg-primary/10"
                              )}
                              onClick={() => {
                                field.onChange(lead.id);
                                setLeader(lead);
                              }}
                            >
                              <div className="font-medium">{lead.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {lead.email}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {lead.address}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-sm text-muted-foreground">
                            No leaders found.
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
          </div>

          <DialogFooter className="mt-6">
            <Button 
                variant="outline"
                size="sm"
                disabled={form.formState.isSubmitting || assignLeaderMutation.isPending}
                onClick={()=> {form.reset(); setOpen(false);} }>
                Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={
                !form.watch("leaderId") || assignLeaderMutation.isPending
              }
            >
              {assignLeaderMutation.isPending ? "Assigning..." : "Assign Leader"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
      </DialogContent>
    </Dialog>
  )
}

