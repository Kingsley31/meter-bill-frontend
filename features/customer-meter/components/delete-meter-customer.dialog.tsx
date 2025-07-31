import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CustomerMeter } from "../customer-meter.types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { displayError, displaySuccess } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { useState } from "react";
import { useDeleteMeterCustomer } from "../hooks/use-delete-meter-customer.hook";


export type DeleteMeterCustomerDialogProps = {
  customerMeter: CustomerMeter;
  refetch: () => void;
}

export function DeleteMeterCustomerDialog({ customerMeter, refetch }: DeleteMeterCustomerDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteCustomerMeterMutation = useDeleteMeterCustomer();

  const handleDelete = () => {
    deleteCustomerMeterMutation.mutate({meterId: customerMeter.meterId, customerId: customerMeter.customerId}, {
      onSuccess: () => {
        displaySuccess("Remove Meter Customer", `${customerMeter.customerName} has been uassigned meter ${customerMeter.meterNumber} successfully.`);
        refetch();
        setOpen(false);
      },
      onError: (error: unknown) => {
        const message = getErrorMessage(error);
        displayError("Failed to removed customer", message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Meter Customer</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {customerMeter.customerName} from meter {customerMeter.meter.meterNumber} customers list? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="destructive" disabled={deleteCustomerMeterMutation.isPending} onClick={handleDelete}>{deleteCustomerMeterMutation.isPending ? "Deleting...":"Delete"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}