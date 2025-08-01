import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Meter } from "@/shared/meter/types";
import { MeterReading } from "../meter.types";
import { format } from "date-fns";


export type MeterReadingBillAlertProps = {
    isOpen: boolean;
    meter: Meter;
    reading: MeterReading;
    setConfirmed: (confirmed: boolean) => void;
}
export function MeterReadingBillConfirmationAlert({isOpen, setConfirmed, meter, reading}:MeterReadingBillAlertProps){
    return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            A bill has already been generated for this meter reading: {reading.kwhReading}kwh with consumption {reading.kwhConsumption}kwh on {format(meter.lastBillDate!,"PPP")}.
            Clicking continue assumes that the generated bill is incorrect.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmed(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => setConfirmed(true)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}