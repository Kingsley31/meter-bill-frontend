"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LandPlot } from "lucide-react"
import { assignMeterAreaFormSchema, AssignMeterAreaFormValues } from "../validations/assign-meter-area.schema"
import { ResourceType } from "@/enums/resuorce-type"
import { Meter } from "../meter.types"
import { useResourceOptions } from "@/hooks/use-resource-options"
import PaginatedAsyncSelect, { OptionType } from "@/components/paginated-async-select"
import { useState } from "react"
import { useAssignMeterArea } from "../hooks/use-assign-meter-area.hook"
import { displayError, displaySuccess } from "@/components/display-message"
import { getErrorMessage } from "@/lib/utils"
import { toast } from "sonner"

export type AssignMeterAreaProps = {
    meter: Meter;
    refetch: () => void;
}

export function AssignMeterArea({ meter, refetch }: AssignMeterAreaProps) {
    const {loadOptions:loadAreaOptions} =  useResourceOptions(ResourceType.AREA);
    const [areaName, setAreaName] = useState<string>("");
    const form = useForm<AssignMeterAreaFormValues>({
        resolver: zodResolver(assignMeterAreaFormSchema),
        defaultValues: {
            areaId: "",
            location: "",
        },
    })

    const assignMeterAreaMutation = useAssignMeterArea();

  const handleSubmit = (data: AssignMeterAreaFormValues) => {
    if (data.areaId == meter.areaId) {
      toast.error('Meter is already assigned to this area')
      return;
    }
    if (data.location == meter.location) {
      toast.error('Meter is already assigned to this location')
      return;
    }
    assignMeterAreaMutation.mutate({...data, areaName, meterId: meter.id}, {
        onSuccess: () => {
            displaySuccess("Meter Assigned successfully", `Meter ${meter.meterNumber} has been assigned to ${areaName}.`);
            form.reset();
            refetch();
        },
        onError: (error: unknown) => {
            const message = getErrorMessage(error);
            displayError("Failed to create meter", message);
        }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Meter to Area</CardTitle>
        <CardDescription>
          Link this meter to a designated area in the system and update its physical location. This helps ensure accurate tracking, billing, and maintenance.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 item-center gap-6 mb-8 mt-8">
            <div className="hidden md:flex flex-col items-center"><LandPlot strokeWidth={0.5} className="w-2/6 h-40"/></div>
            <div className="col-span-2">
            <FormField
              control={form.control}
              name="areaId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Area<span className="text-red-600">*</span></FormLabel>
                  <PaginatedAsyncSelect
                        loadOptions={loadAreaOptions}
                        setFormValue={(option: OptionType | null) => {
                            field.onChange(option?.value)
                            setAreaName(option?.label || "")
                        }}
                        placeholder="Select area"
                    />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-6"></div>
            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location<span className="text-red-600">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Block A - Utility Room" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-8"></div>
            <div className="flex justify-between">
                <Button type="button" variant="secondary" onClick={() => form.reset()}>
                Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting || assignMeterAreaMutation.status=="pending"}>
                    {form.formState.isSubmitting || assignMeterAreaMutation.status=="pending" ? "Assinging..." : "Assign Meter"}
                </Button>
            </div>
            </div>
          </CardContent>
        </form>
      </Form>
    </Card>
  )
}
