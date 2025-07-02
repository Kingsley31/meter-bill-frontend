"use client"
import { CreateMeterForm } from "@/features/meter/components/create-meter.form";
import NavbarDB from "../../components/navbar";
import { useResourceOptions } from "@/hooks/use-resource-options";
import { ResourceType } from "@/enums/resuorce-type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { routes } from "@/data/routes";

export default function CreateMeterPage() {
        const {loadOptions:loadAreaOptions} =  useResourceOptions(ResourceType.AREA);
        const {loadOptions:loadMeterOptions} = useResourceOptions(ResourceType.METER);
    return (
        <main>
            <NavbarDB>
                <h1 className="text-base font-medium">Create Meter</h1>
                <Button asChild><Link href={routes.meters.path}>View Meters<EyeIcon/></Link></Button>
            </NavbarDB>
            <div className="px-auto py-8 max-w-4xl mx-auto">
                <CreateMeterForm loadAreaOptions={loadAreaOptions} loadMeterOptions={loadMeterOptions} />
            </div>
        </main>
    );
}