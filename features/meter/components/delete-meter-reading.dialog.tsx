import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MeterReading } from "../meter.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { format } from "date-fns";
import { displayError, displaySuccess } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { useDeleteMeterReading } from "../hooks/use-delete-meter-reading.hook";

export type DeleteMeterReadingDialogProps = {
  reading: MeterReading;
  refetch: () => void;
  disabled?: boolean;
}
export function DeleteMeterReadingDialog({ reading, refetch, disabled }: DeleteMeterReadingDialogProps) {
 const [open, setOpen] = useState(false);
   const deleteMeterReadingMutation = useDeleteMeterReading();
 
   const handleDelete = () => {
     deleteMeterReadingMutation.mutate({meterId: reading.meterId, readingId: reading.id}, {
       onSuccess: () => {
         displaySuccess("Deleted Meter Reading", `Reading ${reading.kwhReading}kwh taken on ${format(reading.readingDate,"PPP")} has been deleted successfully.`);
         refetch();
         setOpen(false);
       },
       onError: (error: unknown) => {
         const message = getErrorMessage(error);
         displayError("Failed to Delete Reading", message);
       }
     });
   };
 
   return (
     <Dialog open={open} onOpenChange={setOpen}>
       <DialogTrigger asChild>
         <Button variant="ghost" disabled={disabled} className="flex items-start justify-start w-full">
           <Trash2 className="h-4 w-4 text-red-600" />
           Delete
         </Button>
       </DialogTrigger>
       <DialogContent>
         <DialogHeader>
           <DialogTitle>Delete Meter Reading</DialogTitle>
           <DialogDescription>
             Are you sure you want to delete this meter reading {reading.kwhReading} kwh taken on {format(reading.readingDate,"PPP")}? This action cannot be undone.
           </DialogDescription>
         </DialogHeader>
         <DialogFooter>
           <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
           <Button variant="destructive" disabled={deleteMeterReadingMutation.isPending} onClick={handleDelete}>{deleteMeterReadingMutation.isPending ? "Deleting...":"Delete"}</Button>
         </DialogFooter>
       </DialogContent>
     </Dialog>
   );
}