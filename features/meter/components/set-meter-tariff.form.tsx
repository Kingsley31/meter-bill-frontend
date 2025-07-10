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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "@/lib/utils"
import { Meter } from "@/shared/meter/types"
import { displayError, displaySuccess } from "@/components/display-message"
import { useSetMeterTariff } from "../hooks/use-set-meter-tariff.hook"
import { toast } from "sonner"


const formSchema = z.object({
  tariff: z
    .number({ invalid_type_error: "Billing rate must be a number" })
    .positive("Billing rate must be positive"),
})

type FormValues = z.infer<typeof formSchema>

type SetMeterTariffProps = {
  meter: Meter;
  refetch: () => void;
}

export function SetMeterTariff({ meter, refetch }: SetMeterTariffProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tariff: meter.tariff || 0,
    },
  })

  const setMeterTariffMutation = useSetMeterTariff();

  const handleSubmit = (data: FormValues) => {
    if (meter.tariff == data.tariff) {
        toast.error('This tariff rate is already set to the meter.');
        return;
    }
    setMeterTariffMutation.mutate({meterId: meter.id, tariff: data.tariff},{
         onSuccess: () => {
            displaySuccess("Tariff updated",`Billing rate updated to ₦${form.getValues("tariff")}/kWh.`);
            form.reset({ tariff: form.getValues("tariff") });
            refetch();
        },
        onError: (error: unknown) => {
            const message = getErrorMessage(error);
            displayError("Failed to update tariff", message);
        },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tariff Settings</CardTitle>
        <CardDescription>
          Meter: <span className="font-medium">{meter.meterNumber}</span>
          {meter.customerName && (
            <>
              <br /> Customer: <span className="font-medium">{meter.customerName}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className={`flex ${form.formState.errors.tariff?"items-center":"items-end"} my-6 gap-6`}>
          <div>
            <label className="text-sm font-medium block mb-1">
              New Billing Rate (₦ / kWh)
            </label>
            <Input
              type="number"
              step="0.01"
              {...form.register("tariff", { valueAsNumber: true })}
              disabled={setMeterTariffMutation.isPending}
            />
            {form.formState.errors.tariff && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.tariff.message}
              </p>
            )}
          </div>
          <Button type="submit" disabled={setMeterTariffMutation.isPending}>
            {setMeterTariffMutation.isPending ? "Setting..." : "Set Tariff"}
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}
