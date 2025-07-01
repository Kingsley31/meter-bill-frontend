"use client"
import { CreateMeterForm } from "@/features/meter/components/create-meter.form";
import NavbarDB from "../../components/navbar";
import { useResourceOptions } from "@/hooks/use-resource-options";
import { ResourceType } from "@/enums/resuorce-type";

export default function CreateMeterPage() {
        const {loadOptions:loadAreaOptions} =  useResourceOptions(ResourceType.AREA);
        const {loadOptions:loadMeterOptions} = useResourceOptions(ResourceType.METER);
    return (
        <main>
            <NavbarDB/>
            <div className="px-auto py-8 max-w-4xl mx-auto">
                <CreateMeterForm loadAreaOptions={loadAreaOptions} loadMeterOptions={loadMeterOptions} />
            </div>
        </main>
    );
}