"use client"
import { CreateMeterForm } from "@/features/meter/components/create-meter.form";
import NavbarDB from "../../components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { routes } from "@/data/routes";
import { useAreaOptions } from "@/shared/area/hooks/use-area-options.hook";
import { useMeterOptions } from "@/shared/meter/hooks/use-meter-options.hook";
import { useState } from "react";

export default function CreateMeterPage() {
        const [excludedMeterIds,setExcludedMeterIds] = useState<string[]>()
        const {loadOptions:loadAreaOptions} =  useAreaOptions();
        const {loadOptions:loadMeterOptions} = useMeterOptions(excludedMeterIds);
    return (
        <main>
            <NavbarDB title="Create Meter" showBackBtn>
                <Button asChild><Link href={routes.meters.path}>View Meters<EyeIcon/></Link></Button>
            </NavbarDB>
            <div className="px-auto py-8 max-w-4xl mx-auto">
                <CreateMeterForm loadAreaOptions={loadAreaOptions} loadMeterOptions={loadMeterOptions} onExcludeSelectedMeters={setExcludedMeterIds} />
            </div>
        </main>
    );
}