
'use client';

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useChangeMeterStatus } from "../hooks/use-change-meter-status.hook";
import { useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/utils";
import { displayError, displaySuccess } from "@/components/display-message";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export type MeterStatusPropps = {
    isActive: boolean;
    meterId: string;
    refetch: () => void;
}
export function MeterStatus({ isActive, meterId , refetch}: MeterStatusPropps){
    const [open, setOpen] = useState(false);
    const [ active, setIsActive ] = useState(isActive);
    const { mutateAsync } = useChangeMeterStatus();

    const changeStatus = (status: boolean) => {
        setIsActive(status);
        setOpen(true);
    }

    const submitMeterStatus = async () => {
        setOpen(false);
        toast("Changing meter status...");
        try{
            await mutateAsync({meterId: meterId, isActive: active});
            displaySuccess("Status Updated Successfully", `meter ${meterId} status has been updated ssuccessfully.`);
            refetch();
        } catch(error) {
            const message = getErrorMessage(error);
            displayError("Error Updating Status",message);
        }
    }


    return (
        <div className="flex flex-col md:flex-row items-start md:items-center space-x-2">
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will change this meter status to {active ? "activate" : "inactivate"}.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {setIsActive(isActive);}}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={submitMeterStatus}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <span className="text-xs font-bold hidden md:flex">Change Status:</span>
            <ToggleGroup 
                type="single" 
                variant="outline"
                color="var(--primary)"
                value={active ? "active" : "inactive"}
                defaultValue={isActive ? "active" : "inactive"} 
                onValueChange={(value: string) => changeStatus(value == "active")} 
            >
                <ToggleGroupItem value="active" aria-label="Toggle active" className="data-[state=on]:text-white data-[state=on]:bg-green-600">
                    Active
                </ToggleGroupItem>
                <ToggleGroupItem value="inactive" aria-label="Toggle inactive" className="data-[state=on]:text-white data-[state=on]:bg-destructive">
                    Inactive
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
       
    );
}