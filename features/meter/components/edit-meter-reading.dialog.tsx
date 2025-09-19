import { MeterReading } from "../meter.types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MAX_METER_IMAGE_SIZE_BYTES } from "../constants";
import { Meter } from "@/shared/meter/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { uploadFile } from "@/shared/file/api/upload-file.api";
import { displayError, displaySuccess } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MeterReadingConfirmationAlert } from "./confirm-meter-reading.dialog";
import { Textarea } from "@/components/ui/textarea";
import { useEditMeterReading } from "../hooks/use-edit-meter-reading.hook";
import { MeterReadingBillConfirmationAlert } from "./confirm-meter-reading-bill.dialog";
//import { set } from "date-fns";


const ALLOWED_MIME_TYPES = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'application/pdf',
  ];
const ALLOWED_TYPES = [
    '.png',
    '.jpeg',
    '.jpg',
    '.pdf',
  ];

const schema = z.object({
  image: z
    .any()
    .refine((file) => file instanceof File && file.size > 0, {
      message: "Please upload a valid meter image.",
    })
    .refine((file) => file instanceof File && file.size < MAX_METER_IMAGE_SIZE_BYTES, {
      message: `Uploaded image must be less than ${Math.round(MAX_METER_IMAGE_SIZE_BYTES/1048576)}mb.`,
    })
    .refine((file) => file instanceof File && ALLOWED_MIME_TYPES.includes(file.type), {
      message: `Only these types are allowed ${ALLOWED_TYPES.join(', ')}.`,
    }),
    reason: z.string().min(1, "Date is required."),
//   date: z.string().min(1, "Date is required."),
  reading: z
    .number({ invalid_type_error: "Reading must be a number" })
    .positive("Reading must be positive."),
})

type FormValues = z.infer<typeof schema>;
export type EditMeterReadingProps = {
    meterReading: MeterReading;
    refetch: () => void;
    disabled: boolean;
    meter: Meter;
    readingPreviousReading?: MeterReading | null;
}

export function billHasBeenGenerated(meter: Meter, reading: MeterReading): boolean {
    if (!meter.lastBillDate) return false;
    const lastBillDate = new Date(meter.lastBillDate);
    const readingDate = new Date(reading.readingDate);
    return readingDate <= lastBillDate;
}

export function EditMeterReadingDialog({meterReading, readingPreviousReading, meter, refetch, disabled }: EditMeterReadingProps) {
     const form = useForm<z.infer<typeof schema>>({
            resolver: zodResolver(schema),
        })
        const [open, setOpen] = useState(false)
        const [confirmReadingOpen, setConfirmReadingOpen] = useState(false)
        const [confirmReadingBillOpen, setConfirmReadingBillOpen] = useState(false);
        const [isSubmitting, setIsSubmitting] = useState(false)
    
      const useEditReading = useEditMeterReading();
      const uploadReading = async (data: FormValues) => {
        setIsSubmitting(true)
        try {
            const meterImage = await uploadFile({file: data.image});
            useEditReading.mutate({
                meterId: meter.id,
                readingId: meterReading.id,
                kwhReading: data.reading,
                readingDate: meterReading.readingDate, 
                meterImage,
                reason: data.reason,
            },{
                    onSuccess: () => {
                        displaySuccess("Reading Updated", "Your meter reading has been updated successfully.");
                        form.reset()
                        setIsSubmitting(false)
                        setOpen(false)
                        refetch();
                    },
                    onError: (error: unknown) => {
                        setIsSubmitting(false)
                        const message = getErrorMessage(error);
                        displayError("Reading Update failed", message);
                    },
            });
        }catch (err) {
            setIsSubmitting(false)
            const message = getErrorMessage(err);
            displayError("Meter Image Upload failed", message);
        }
        
      }
      
    
      const onReadingConfirmed = async (confirmed: boolean) => {
        setConfirmReadingOpen(false);
        if (!confirmed) return;
        uploadReading(form.getValues());
      }

      const onReadingBillConfirmed = async (confirmed: boolean) => {
        setConfirmReadingBillOpen(false);
        if (!confirmed) setOpen(false);
      }
    
      const onSubmit = async (data: FormValues) => {
        // if (meter.currentKwhReadingDate && new Date(meter.currentKwhReadingDate) > new Date(data.date)) {
        //     form.setError("date", {message:"Reading date must be after meter current reading date."});
        //     return;
        // }
        if (data.reading === meterReading.kwhReading) {
          form.setError("reading", {message:"Reading must be different from the current reading."});
          return;
        }
        if (!meter.hasMaxKwhReading && readingPreviousReading && data.reading < readingPreviousReading.kwhReading) {
            console.log(meter.hasMaxKwhReading);
            form.setError("reading", {message:"Reading cannot be less than the previous meter reading for a meter that doesn't have a reset value."});
            return;
        }
        if (meter.hasMaxKwhReading && data.reading > (meter.maxKwhReading ?? 0)) {
            form.setError("reading", {message:"Reading cannot be more than the meter max kwh reading."});
            return;
        }
        if (readingPreviousReading && data.reading < readingPreviousReading.kwhReading) {
            setConfirmReadingOpen(true);
            return;
        }
        uploadReading(data);
      }

      if (confirmReadingBillOpen) {
        return (
          <MeterReadingBillConfirmationAlert
            isOpen={confirmReadingBillOpen}
            setConfirmed={onReadingBillConfirmed}
            meter={meter}
            reading={meterReading}
          />
        );
      }
        return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" disabled={disabled} onClick={() => setConfirmReadingBillOpen(billHasBeenGenerated(meter, meterReading))} className="flex items-start justify-start w-full">
                <Edit className="h-4 w-4 text-primary" />
                Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Meter Reading</DialogTitle>
              <DialogDescription>
                Provide the meter image, reading value, and the date it was taken.
              </DialogDescription>
            </DialogHeader>
    
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                <Label htmlFor="image">Meter Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) form.setValue("image", file)
                  }}
                />
                {form.formState.errors.image && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.image.message?.toString()}
                  </p>
                )}
              </div>
    
              {/* <div className="space-y-2">
                <Label htmlFor="date">Reading Date</Label>
                <Input id="date" type="date" {...form.register("date")} />
                {form.formState.errors.date && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.date.message}
                  </p>
                )}
              </div> */}
    
              <div className="space-y-2">
                <Label htmlFor="reading">Meter Reading (kWh)</Label>
                <Input
                  id="reading"
                  type="number"
                  defaultValue={meterReading.kwhReading}
                  step="any"
                  {...form.register("reading", { valueAsNumber: true })}
                />
                {form.formState.errors.reading && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.reading.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Type your reason for editing this reading here." {...form.register("reason")} />
                {form.formState.errors.reason && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.reason.message}
                  </p>
                )}
              </div>
    
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Reading"}
                </Button>
              </DialogFooter>
            </form>
            <MeterReadingConfirmationAlert key={meterReading.id} previousReading={readingPreviousReading?.kwhReading??0} isOpen={confirmReadingOpen} setConfirmed={onReadingConfirmed} reading={form.watch('reading')}/>
          </DialogContent>
        </Dialog>
      );
}