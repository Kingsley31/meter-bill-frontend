"use client"


import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { getErrorMessage } from "@/lib/utils"
import { Area } from "@/shared/area/types"
import { displayError, displaySuccess } from "@/components/display-message"
import { useSetAreaTariff } from "../hooks/use-set-area-tariff.hook"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react"


const formSchema = z.object({
  tariff: z
    .number({ invalid_type_error: "Billing rate must be a number" })
    .positive("Billing rate must be positive"),
  effectiveFrom: z.string().min(1, "Effective date is required."),
})

type FormValues = z.infer<typeof formSchema>

type SetAreaTariffProps = {
  area: Area;
  refetch: () => void;
}

export function SetAreaTariff({ area, refetch }: SetAreaTariffProps) {
  const [open, setOpen] = useState(false)
  // const today = new Date();
  // const year = today.getFullYear();
  // const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  // const day = String(today.getDate()).padStart(2, '0');
  // const minDate = `${year}-${month}-${day}`;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const setAreaTariffMutation = useSetAreaTariff();

  const handleSubmit = (data: FormValues) => {
    if (area.currentTariff == data.tariff) {
        toast.error('This tariff rate is already set to the area.');
        return;
    }
    setAreaTariffMutation.mutate({areaId: area.id, tariff: data.tariff,effectiveFrom: data.effectiveFrom, areaName: area.areaName},{
         onSuccess: () => {
            displaySuccess("Tariff Set",`Billing rate set to ₦${form.getValues("tariff")}/kWh.`);
            form.reset({ tariff: form.getValues("tariff") });
            setOpen(false)
            refetch();
        },
        onError: (error: unknown) => {
            const message = getErrorMessage(error);
            displayError("Failed to update tariff", message);
        },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button variant="default">Set Tariff</Button>
      </DialogTrigger>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>Tariff Settings</DialogTitle>
        <DialogDescription>
          Area: <span className="font-medium">{area.areaName}</span>
          <br /> Curren Tariff: <span className="font-medium">{area.currentTariff? "₦"+area.currentTariff.toString() :"None"}</span>
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="tariff">
              New Billing Rate (₦ / kWh)
            </Label>
            <Input
              id="tariff"
              placeholder="Enter new billing rate"
              type="number"
              step="0.01"
              {...form.register("tariff", { valueAsNumber: true })}
              disabled={setAreaTariffMutation.isPending}
            />
            {form.formState.errors.tariff && (
              <p className="text-sm text-red-500 mt-1">
                {form.formState.errors.tariff.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="effectiveFrom">Effective From</Label>
            <Input id="effectiveFrom" type="date" {...form.register("effectiveFrom")}/>
            {form.formState.errors.effectiveFrom && (
              <p className="text-sm text-red-500">
                {form.formState.errors.effectiveFrom.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={setAreaTariffMutation.isPending}>
              {setAreaTariffMutation.isPending ? "Setting..." : "Set Tariff"}
            </Button>
          </DialogFooter>
      </form>
      </DialogContent>
    </Dialog>
  )
}
