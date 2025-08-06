import PaginatedAsyncSelect, { LoadOptions, OptionType } from "@/components/paginated-async-select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Meter } from "@/shared/meter/types";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { CreateMeterFormValues, createMeterSchema } from "../validations/create-meter.schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MeterPurpose, MeterType, Operaor } from "@/shared/meter/enums";
import { displayError, displaySuccess } from "@/components/display-message";
import { getErrorMessage } from "@/lib/utils";
import { useEditMeter } from "../hooks/use-edit-meter-details.hook";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { subMeterOperators } from "../data";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AreaOption } from "@/shared/area/hooks/use-area-options.hook";
import { MeterOption } from "@/shared/meter/hooks/use-meter-options.hook";

export type EditMeterDetailDialogProps = {
    refetch: () => void;
    meter: Meter;
    loadAreaOptions: LoadOptions<AreaOption>;
    loadMeterOptions: LoadOptions<MeterOption>;
}

export function EditMeterDetailDialog({ refetch, meter,loadAreaOptions, loadMeterOptions }: EditMeterDetailDialogProps) {
    const [isClient, setIsClient] = useState(false);
        useEffect(() => {
            setIsClient(true);
        }, []);
     const [open, setOpen] = useState(false)
     const [subMeterError, setSubMeterError] = useState<string | null>(null);
         const [areaName, setAreaName] = useState<string>(meter.areaName);
     
         const editMeterMutation = useEditMeter();
     
         const form = useForm<CreateMeterFormValues>({
             resolver: zodResolver(createMeterSchema),
             defaultValues: {
                 meterNumber: meter.meterNumber,
                 areaId: meter.areaId,
                 location: meter.location,
                 ctRating: meter.ctRating,
                 ctMultiplierFactor: meter.ctMultiplierFactor,
                 purpose: meter.purpose,
                 type: meter.type,
                 calculationReferenceMeterId: meter.calculationReferenceMeterId ?? "",
                 hasMaxKwhReading: meter.hasMaxKwhReading,
                 maxKwhReading: meter.maxKwhReading,
                 subMeters: meter.subMeters.map(subMeter => ({
                     subMeterId: subMeter.subMeterId,
                     operator: subMeter.operator as Operaor.ADD | Operaor.MINUS,
                 })),
             },
         });

        const { fields, append, remove } = useFieldArray({
                 control: form.control,
                 name: "subMeters",
             });
         
        const watchHasMaxKwh = form.watch("hasMaxKwhReading");
        const watchType = form.watch("type");

        const onSubmit: (values: CreateMeterFormValues) => Promise<void> = async (values) => {
                console.log(values);
                if (values.ctRating == meter.ctRating && values.ctMultiplierFactor == meter.ctMultiplierFactor && values.hasMaxKwhReading == meter.hasMaxKwhReading) {
                    displayError("Failed to edit meter", "New meter details must be different from the curren details.");
                    return;
                }
                setSubMeterError(null)
                if (values.type === MeterType.DERIVED && (!values.subMeters || values.subMeters.length === 0)) {
                    setSubMeterError("At least one sub meter is required.")
                    return
                }
                editMeterMutation.mutate({...values, areaName, meterId: meter.id}, {
                    onSuccess: () => {
                        displaySuccess("Meter updated successfully", `Meter ${meter.meterNumber} has been updated.`);
                        setOpen(false);
                        refetch();
                    },
                    onError: (error: unknown) => {
                        const message = getErrorMessage(error);
                        displayError("Failed to create meter", message);
                    }
                });
            }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            <Button variant="default" className="font-bold"><Edit/> Edit Details</Button>
            </DialogTrigger>
            <DialogContent>
            <ScrollArea className="max-h-screen">
            <DialogHeader>
                <DialogTitle>Edit Meter Detail</DialogTitle>
                <DialogDescription>
                Provide the meter ct rating, multiplier factor and max kwh reading to update this meter.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <FormField
                                            control={form.control}
                                            disabled
                                            name="meterNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Meter Number<span className="text-red-600">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter meter number" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            disabled
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Location<span className="text-red-600">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter meter location" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ctRating"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CT Rating<span className="text-red-600">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="CT Rating" {...field} value={field.value ?? ""}/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ctMultiplierFactor"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Multiplier Factor<span className="text-red-600">*</span></FormLabel>
                                                    <FormControl>
                                                        <Input type="number" step="0.01" placeholder="CT Multiplier" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            disabled
                                            name="purpose"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormLabel>Purpose<span className="text-red-600">*</span></FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value} disabled>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select purpose" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={MeterPurpose.CONSUMER}>{MeterPurpose.CONSUMER.toUpperCase()}</SelectItem>
                                                            <SelectItem value={MeterPurpose.BULK}>{MeterPurpose.BULK.toUpperCase()}</SelectItem>
                                                            <SelectItem value={MeterPurpose.AUDIT}>{MeterPurpose.AUDIT.toUpperCase()}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="hasMaxKwhReading"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col items-start gap-2">
                                                    <FormLabel>Has Max kWh Reading?</FormLabel>
                                                    <div className="flex w-full h-9 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs">
                                                        <FormControl>
                                                            <input
                                                                type="checkbox"
                                                                checked={field.value}
                                                                onChange={(e) => field.onChange(e.target.checked)}
                                                                className="mr-2"
                                                            />
                                                        </FormControl>
                                                        <p className="overflow-x-auto">{watchHasMaxKwh ? "Yes": "No"}</p>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {watchHasMaxKwh && (
                                            <FormField
                                                control={form.control}
                                                name="maxKwhReading"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Max kWh Reading<span className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input type="number" placeholder="Max kWh Reading" {...field} value={field.value ?? ""}/>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                        <FormField
                                            control={form.control}
                                            disabled
                                            name="areaId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Area<span className="text-red-600">*</span></FormLabel>
                                                     <FormControl>
                                                        {isClient ? (
                                                            <PaginatedAsyncSelect
                                                                loadOptions={loadAreaOptions}
                                                                disabled
                                                                {...field}
                                                                name={field.name}
                                                                setFormValue={(option: OptionType | null) => {
                                                                    field.onChange(option?.value)
                                                                    setAreaName(option?.label || "")
                                                                }}
                                                                placeholder="Select area"
                                                            />
                                                        ) : (
                                                            <div className="h-10 bg-muted rounded" />
                                                        )}
                                                     </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            disabled
                                            name="type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Type<span className="text-red-600">*</span></FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value} disabled>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value={MeterType.DERIVED}>{MeterType.DERIVED.toUpperCase()}</SelectItem>
                                                            <SelectItem value={MeterType.MEASUREMENT}>{MeterType.MEASUREMENT.toUpperCase()}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {watchType==MeterType.DERIVED && (
                                            <FormField
                                                control={form.control}
                                                disabled
                                                name="calculationReferenceMeterId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Calculation Reference Meter<span className="text-red-600">*</span></FormLabel>
                                                        <FormControl>
                                                            {isClient ? (
                                                                <PaginatedAsyncSelect
                                                                    loadOptions={loadMeterOptions}
                                                                    name={field.name}
                                                                    setFormValue={(option: OptionType | null) => {
                                                                        field.onChange(option?.value)
                                                                    }}
                                                                    placeholder="Select reference meter"
                                                                />
                                                            ) : (
                                                                <div className="h-10 bg-muted rounded" />
                                                            )}
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        )}
                                    </div>
                                    {watchType==MeterType.DERIVED && (
                                        <div className="mb-6">
                                            <Separator className="mb-4"/>
                                            <div className="flex items-center justify-between mb-6">
                                                <span className="font-medium">Sub Meters<span className="text-red-600">*</span></span>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    disabled
                                                    variant="outline"
                                                    onClick={() => append({ subMeterId: "", operator: Operaor.ADD })}
                                                >
                                                    Add Sub Meter
                                                </Button>
                                            </div>
                                            {fields.length === 0 && (
                                                <div className="text-sm text-muted-foreground">No sub meters added.</div>
                                            )}
                                            {subMeterError && (
                                                <div className="text-sm text-red-600 mb-2">{subMeterError}</div>
                                            )}
                                            {fields.map((fieldItem, idx) => (
                                                <div key={fieldItem.id} className="grid grid-cols-5 gap-6 mb-6 items-end justify-start">
                                                    <FormField
                                                        control={form.control}
                                                        disabled
                                                        name={`subMeters.${idx}.subMeterId`}
                                                        render={({ field }) => (
                                                            <FormItem className="col-span-3">
                                                                <FormLabel>Sub Meter</FormLabel>
                                                                <FormControl>
                                                                    {isClient ? (
                                                                        <PaginatedAsyncSelect
                                                                            loadOptions={loadMeterOptions}
                                                                            name={field.name}
                                                                            setFormValue={(option: OptionType | null) => {
                                                                                field.onChange(option?.value)
                                                                            }}
                                                                            placeholder="Select sub meter"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-10 bg-muted rounded" />
                                                                    )}
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        disabled
                                                        name={`subMeters.${idx}.operator`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Operator</FormLabel>
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue placeholder="Operator" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {subMeterOperators.map((op) => (
                                                                            <SelectItem key={op.value} value={op.value}>
                                                                                {op.label}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        disabled
                                                        size="icon"
                                                        onClick={() => remove(idx)}
                                                    >
                                                        &times;
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                <Separator />
                                <DialogFooter>
                                    <Button type="submit" disabled={form.formState.isSubmitting || editMeterMutation.isPending} onClick={()=> console.log(form.formState.errors)}>
                                        {form.formState.isSubmitting || editMeterMutation.isPending ? "Submitting..." : "Submit Details"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
            </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}