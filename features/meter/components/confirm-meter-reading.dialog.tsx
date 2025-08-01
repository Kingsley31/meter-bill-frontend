import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";


export type MeterReadingResetAlertProps = {
    isOpen: boolean;
    previousReading: number;
    reading: number;
    setConfirmed: (confirmed: boolean) => void;
}
export function MeterReadingConfirmationAlert({isOpen, setConfirmed, previousReading, reading}:MeterReadingResetAlertProps){
    return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your reading: {reading} is less than the {"meter's"} previous reading: {previousReading}.
            Clicking continue assumes that the {"meter's"} reading has reset.
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