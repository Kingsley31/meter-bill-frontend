
'use client';

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type MeterStatusPropps = {
    isActive?: boolean;
    refetch?: () => void;
}
export function MeterStatus({ isActive, refetch}: MeterStatusPropps){

    const changeStatus = (status: boolean) => {
        if (refetch)
            refetch();
    }

    console.log(isActive);

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center space-x-2">
            <span className="text-xs font-bold hidden md:flex">Change Status:</span>
            <ToggleGroup 
                type="single" 
                variant="outline"
                color="var(--primary)"
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