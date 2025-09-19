import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Meter } from "@/shared/meter/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { displayError, displaySuccess } from "@/components/display-message"
import { getErrorMessage } from "@/lib/utils"
import { MAX_METER_IMAGE_SIZE_BYTES } from "../constants"
import { uploadFile } from "@/shared/file/api/upload-file.api"
import { useUploadMeterReading } from "../hooks/use-upload-meter-reading.hook"
import { MeterReadingConfirmationAlert } from "./confirm-meter-reading.dialog"



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
  date: z.string().min(1, "Date is required."),
  reading: z
    .number({ invalid_type_error: "Reading must be a number" })
    .positive("Reading must be positive."),
})

type FormValues = z.infer<typeof schema>;
export enum MeterReadingFormTriggerType {
  BUTTON = 'button',
  MENU = 'menu'
}
type CreateMeterReadingFormProps = {
    meter: Meter;
    refetch: () => void;
    triggerType: MeterReadingFormTriggerType;
}

export function CreateMeterReadingForm({meter, refetch, triggerType = MeterReadingFormTriggerType.BUTTON}: CreateMeterReadingFormProps) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })
    const [open, setOpen] = useState(false)
    const [confirmReadingOpen, setConfirmReadingOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

  const useUploadReading = useUploadMeterReading();
  const uploadReading = async (data: FormValues) => {
    setIsSubmitting(true)
    try {
        const meterImage = await uploadFile({file: data.image});
        useUploadReading.mutate({meterId: meter.id, kwhReading: data.reading,readingDate: data.date, meterImage},{
                onSuccess: () => {
                    displaySuccess("Reading uploaded", "Your meter reading has been submitted successfully.");
                    form.reset()
                    setIsSubmitting(false)
                    setOpen(false)
                    refetch();
                },
                onError: (error: unknown) => {
                    setIsSubmitting(false)
                    const message = getErrorMessage(error);
                    displayError("Reading Upload failed", message);
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

  const onSubmit = async (data: FormValues) => {
    if (meter.currentKwhReadingDate && new Date(meter.currentKwhReadingDate) > new Date(data.date)) {
        form.setError("date", {message:"Reading date must be after meter current reading date."});
        return;
    }
    if (!meter.hasMaxKwhReading && data.reading < meter.currentKwhReading) {
        form.setError("reading", {message:"Reading cannot be less than the current meter reading for a meter that doesn't have a reset value."});
        return;
    }
    if (meter.hasMaxKwhReading && data.reading > (meter.maxKwhReading ?? 0)) {
        form.setError("reading", {message:"Reading cannot be more than the meter max kwh reading."});
        return;
    }
    if (data.reading < meter.currentKwhReading) {
        setConfirmReadingOpen(true);
        return;
    }
    uploadReading(data);
  }
    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerType == MeterReadingFormTriggerType.BUTTON ? (<Button>Enter Reading</Button>) : (<Button variant="ghost">Enter Reading</Button>)}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Meter Reading</DialogTitle>
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

          <div className="space-y-2">
            <Label htmlFor="date">Reading Date</Label>
            <Input id="date" type="date" {...form.register("date")} />
            {form.formState.errors.date && (
              <p className="text-sm text-red-500">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reading">Meter Reading (kWh)</Label>
            <Input
              id="reading"
              type="number"
              step="any"
              {...form.register("reading", { valueAsNumber: true })}
            />
            {form.formState.errors.reading && (
              <p className="text-sm text-red-500">
                {form.formState.errors.reading.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Reading"}
            </Button>
          </DialogFooter>
        </form>
        <MeterReadingConfirmationAlert previousReading={meter.currentKwhReading} isOpen={confirmReadingOpen} setConfirmed={onReadingConfirmed} reading={form.watch('reading')}/>
      </DialogContent>
    </Dialog>
  );
}