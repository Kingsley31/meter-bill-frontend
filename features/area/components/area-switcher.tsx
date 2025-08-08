'use client';
import { displayError } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { AreaAllOption, AreaOption, useAreaOptions } from "@/shared/area/hooks/use-area-options.hook";
import { Area } from "@/shared/area/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getArea } from "../api/get-area.api";
import PaginatedAsyncSelect from "@/components/paginated-async-select";


export function AreaSwitcher() {
    const [isClient, setIsClient] = useState(false);
        useEffect(() => {
            setIsClient(true);
        }, []);
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentAreaId = searchParams.get('areaId')?.trim();
    const [currentArea, setCurrentArea] = useState<Area|undefined>();
    const { loadOptions: loadAreaOptions} = useAreaOptions(true);
    useEffect(() => {
        const cachedArea = localStorage.getItem("currentArea");
        if (cachedArea) {
            setCurrentArea(JSON.parse(cachedArea));
        }
    }, []);
   
    const loadCurrentArea = async (areaId: string) => {
        try {
            const area = await getArea({areaId: areaId});
            setCurrentArea(area);
            localStorage.setItem("currentArea", JSON.stringify(area));
        } catch(e) {
            const message = getErrorMessage(e);
            displayError("Error switching to current area",message);
        }
    }
    useEffect(()=> {
        if (currentAreaId && currentAreaId.toLowerCase()!="all") {
            loadCurrentArea(currentAreaId);
        }
        if (!currentAreaId) {
            localStorage.removeItem("currentArea");
            setCurrentArea(undefined);
        }
    }, [currentAreaId]);

    const updateSearchParam = (area: Area) => {
        if (area.id == 'all') {localStorage.removeItem("currentArea")}
        const params = new URLSearchParams();
        if (area.id != 'all') {params.set("areaId", area.id);}
        // Keep existing params that are not in the form
        searchParams.forEach((v, k) => {
            if (k == 'areaId' && area.id == 'all') return;
            if (!params.has(k)) params.set(k, v);
        });
        router.replace(`?${params.toString()}`);
    }

    return (
        <div className="flex flex-row items-center">
            <label className="text-xs font-semibold mr-1">Switch Area:</label>
            {isClient ? (currentArea ? (
                <PaginatedAsyncSelect
                    loadOptions={loadAreaOptions}
                    defaultValue={{value: currentArea.id,label: currentArea.areaName,area: currentArea}}
                    setFormValue={(option: AreaOption | null) => {
                        setCurrentArea(option?.area)
                        if (option) {
                            updateSearchParam(option.area);
                        }
                    }}
                    placeholder="Select area"
                    className="w-40"
                />
            ):(
                <PaginatedAsyncSelect
                    loadOptions={loadAreaOptions}
                    defaultValue={AreaAllOption}
                    setFormValue={(option: AreaOption | null) => {
                        setCurrentArea(option?.area)
                        if (option) {
                            updateSearchParam(option.area);
                        }
                    }}
                    placeholder="Select area"
                    className="w-40"
                />
            )
        ) : (
                <div className="h-10 bg-muted rounded" />
            )}
        </div>
    );
}